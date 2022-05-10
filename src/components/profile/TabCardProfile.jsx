const TabCardProfile = (props) => {
  return(
    <div className="md:col-span-2 w-full p-6 rounded-lg shadow-lg backdrop-blur-lg bg-[#323652]/50 my-0 md:my-20">
      <h5 className="text-white text-4xl text-extrabold text-center leading-tight font-bold mb-2">{ props.title }</h5>
      { props.children }
    </div>
  )
}

export default TabCardProfile;