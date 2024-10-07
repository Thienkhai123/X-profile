
const EmtyLayout = props => {
  const { component: Component } = props
  return <Component {...props} component={null} />
}

export default EmtyLayout
