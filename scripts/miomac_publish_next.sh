# Requirement: 
# + Mono (thư viện mono cho mac support bởi Microsoft, chứ không phải ca sĩ nhe) 
#     https://www.mono-project.com/download/stable/
# + Package MSDeploy (cài web deploy trên Windows, rồi copy cả thư mục từ C:/Program Files/IIS/Web Deploy....v3 qua mac)
# + node/yarn
# + Kết nối được với Windows (có thể test bằng Remote desktop)

#### PREPARE:START ####
path_msdeploy="/Users/thiennguyen/Desktop/WebDeploy/msdeploy.exe"
path_publish=
path_project=
site_url=
server=
site=
username=
password=
temp_msdeploy_path=
has_store_password=false
build_cmd=

for arg in "$@"; do
  shift
  case "$arg" in
    '--msdeploy')   set -- "$@" "-m"   ;;
    '--project-path') set -- "$@" "-d"   ;;
    '--publish-path')   set -- "$@" "-l"   ;;
    '--server')   set -- "$@" '-r'   ;;
    '--site-url')   set -- "$@" '-u'   ;;
    '--site')   set -- "$@" '-s'   ;;
    '--username')   set -- "$@" '-U'   ;;
    '--password')   set -- "$@" '-P'   ;;
    '--build-cmd')   set -- "$@" '-b'   ;;
    *)          set -- "$@" "$arg" ;;
  esac
done

OPTIND=1
while getopts "d:l:r:o:s:u:b:U::P::m::" opt
do
  case "$opt" in
    'm') temp_msdeploy_path=$OPTARG ;;
    'd') path_project=$OPTARG ;;
    'l') path_publish=$OPTARG ;;
    'r') server=$OPTARG ;;
    's') site=$OPTARG ;;
    'u') site_url=$OPTARG ;;
    'U') username=$OPTARG ;;
    'P') password=$OPTARG ;;
    'b') build_cmd=$OPTARG ;;
    # *) echo "$opt $OPTARG" ;;
  esac
done
path_msdeploy="${temp_msdeploy_path:-$path_msdeploy}"

Color_Off='\033[0m'       # Text Reset
Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
print_warning() {
    echo "\033[0;33m$1\033[0m"
}
print_success() {
    echo "\033[0;32m$1\033[0m"
}
print_error() {
    echo "\033[1;31m$1\033[0m"
}
#### PREPARE:END ####

#### INPUT:START ####
temp_username=
read -p "Enter Username [$username]: " temp_username
username="${temp_username:-$username}"
echo "Username => $username"
echo

if [ "$password" == "" ]; then
    password=`security find-generic-password -s "MioMacPublish" -a "$username@$server" -w` > /dev/null 2>&1 
    if [ "$password" == "" ]; then
        read -p 'Enter Password: ' -s password
        echo
    else
        has_store_password=true
    fi
fi

#### INPUT:END ####

#### PROCESS:START ####
echo "Authorizing..."
mono $path_msdeploy -verb:getsysteminfo -source:webServer60,computerName=$server,authtype='Basic',userName=$username,password=$password -allowUntrusted > /dev/null 2>&1
if [ $? -ne 0 ]; then 
    if [ $has_store_password == true ]; then
        echo "Deleting old password..."
        security delete-generic-password -s "MioMacPublish" -a "$username@$server" > /dev/null 2>&1
        if [ $? -ne 0 ]; then 
            print_error "Error while deleting old password!"
            exit 0
        fi
        read -p 'Enter Password: ' -s password
        echo
        mono $path_msdeploy -verb:getsysteminfo -source:webServer60,computerName=$server,authtype='Basic',userName=$username,password=$password -allowUntrusted > /dev/null 2>&1
        if [ $? -ne 0 ]; then
            print_error "${RED}Unauthorized\n"
            exit 0
        else
            security add-generic-password -s "MioMacPublish" -a "$username@$server" -w "$password"
            print_success "Authorized"
        fi

    else
        print_error "${RED}Unauthorized\n"
        exit 0
    fi
else
    security add-generic-password -s "MioMacPublish" -a "$username@$server" -w "$password"
    print_success "Authorized"
fi

echo "Building..."
$build_cmd

if [ $? -ne 0 ]; then 
    print_error "Build failed"
    exit 0
else
    print_success "Build success"
fi

echo "Turning off app..."
mono $path_msdeploy -verb:sync -source:recycleApp -dest:recycleApp=$site,recycleMode='StopAppPool',computerName=$server,authtype='Basic',includeAcls='False',userName=$username,password=$password -allowUntrusted
if [ $? -ne 0 ]; then 
    print_error "Turning off failed"
    exit 0
else
    print_success "Turning off success"
fi

mono $path_msdeploy -disableLink:AppPoolExtension -disableLink:ContentExtension -disableLink:CertificateExtension -verb:sync -source:contentPath=$path_project -dest:contentPath=$site,ComputerName=$server,UserName=$username,Password=$password,IncludeAcls=False,AuthType=Basic -enableRule:AppOffline -verbose -allowUntrusted:true -skip:objectName=dirPath,absolutePath="node_modules" -skip:objectName=dirPath,absolutePath="\\\.git" -skip:objectName=dirPath,absolutePath="log" -skip:objectName=dirPath,absolutePath="\\\.next\\cache$",skipAction=Delete -skip:objectName=dirPath,absolutePath="scripts"
if [ $? -ne 0 ]; then 
    print_error "Deploy failed"
    # exit 0
else
    print_success "Deploy success"
fi

echo "Turning on app..."
mono $path_msdeploy -verb:sync -source:recycleApp -dest:recycleApp=$site,recycleMode='StartAppPool',computerName=$server,authtype='Basic',includeAcls='False',userName=$username,password=$password -allowUntrusted

if [ $? -ne 0 ]; then 
    print_error "Turning on failed"
    exit 0
else
    print_success "Turning on success"
fi

open $site_url

#### PROCESS:END ####