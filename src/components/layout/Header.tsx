const Header: React.FC = () => {
    return(
        <>
        {/* HEADER */}
      <header className="border-b border-gray-100">
        <a
          href="https://newtimeafrica.com/"
          className="px-4 py-5 flex items-center justify-center relative block"
          aria-label="New Time Africa home"
        >
          <h1 className="font-semibold text-xl ">  
            <span className="text-red-900"> New</span>
            <span className="text-blue-900"> Time</span>
            <span className="text-green-600"> Africa</span>
          </h1>
        </a>
      </header>
        </>
    )
};
export default Header;