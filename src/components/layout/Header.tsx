const Header: React.FC = () => {
    return(
        <>
        {/* HEADER */}
      <header className="border-b border-gray-100">
        <div id="Hdiv" className="px-4 py-5 flex items-center justify-center relative">
          <h1 className="font-semibold text-xl ">  
            <span className="text-red-900"> New</span>
            <span className="text-blue-900"> Time</span>
            <span className="text-green-600"> Africa</span>
          </h1>
        </div>
      </header>
        </>
    )
};
export default Header;