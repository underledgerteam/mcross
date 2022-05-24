const CardContainerTemplate = (props) => {
  return(
    <div className={`${props?.size || "md:col-span-2"} ${props?.text} ${props?.padding} rounded-lg shadow-lg backdrop-blur-lg bg-[#323652]/50 ${props?.margin}`}>
      { props?.title && (<h5 className="text-white text-4xl text-extrabold text-center leading-tight font-bold mb-8">{ props?.title }</h5>) }
      { props.children }
    </div>
  )
}

export default CardContainerTemplate;