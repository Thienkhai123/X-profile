
const DefaultLayout = props => {
  const { component: Component } = props
  return <Component {...props} component={null} />
}

export default DefaultLayout
