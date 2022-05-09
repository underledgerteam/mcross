const Button = ({
  text = "Button",
  textSize = "",
  textColor = "text-gray-900",
  textWeight = "font-bold",
  buttonStyle = "py-3 px-12 mt-4 mr-4",
  buttonColor = "",
  size = "w-full",
  onClick = () => {}}
) => {
  return (
    <button
      type="button" 
      className={`${size} ${buttonColor} ${textColor} ${textWeight} ${buttonStyle} ${textSize} rounded`}
      onClick={onClick}
    >
      { text }
    </button>
  )
}

export default Button;