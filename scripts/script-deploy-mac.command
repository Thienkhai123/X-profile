# Requirement: 
# + miomac_publish_next.sh và các requirement của nó

# Cách chạy dùng package.json
# 1) copy file miomac_miomac_publish_next.sh và file này vào thư mục scripts của project
# 2) vào package.json, gõ "sh <đường_dẫn_tương_đối_tới_file_này>" vào command trong script muốn chạy
# 3) Chạy npm run script đã thiết lập

#### CONFIG:START ####

## SERVER
computer_name="https://qa.saigonmio.vn:8172/msdeploy.axd"
site="xprofile-ut-admin.saigonmio.com"
username_default=thien
password_default=
## PROJECT
path_core="${PWD}/scripts/miomac_publish_next.sh"
path_project="${PWD}"
build_cmd='next build'

# Muốn custom đường dẫn msdeploy thì input bên dưới
path_msdeploy="/Users/thiennguyen/Desktop/WebDeploy/msdeploy.exe"
# Muốn custom đường dẫn url mở ra sau khi chạy xong script thì input bên dưới, nếu để trống thì sẽ tự động tính toán
site_url_specific="https://xprofile-ut-admin.saigonmio.com:4333/"


#### CONFIG:END ####

#### PREPARE:START ####
site_url_temp="https://$site"
site_url="${site_url_specific:-$site_url_temp}"
username=
password=
#### PREPARE:END ####

#### PROCESS:START ####
args="--project-path $path_project --publish-path $path_publish --environment $environment --server $computer_name --site-url $site_url --site $site"
if [ $path_msdeploy ]; then
  args+=" --msdeploy $path_msdeploy"
fi
if [ $username_default ]; then
  args+=" --username $username_default"
fi
if [ $password_default ]; then
  args+=" --password $password_default"
fi
$path_core --build-cmd "$build_cmd" $args
#### PROCESS:END ####