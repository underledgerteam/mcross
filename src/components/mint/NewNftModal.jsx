const NewNftModal = ({ nftArr, onClose }) => {

  const renderNftCard = () => {
    return nftArr.map((nft) => (
      <div key={nft.dna} className="">
        <img className="w-fit lg:w-full" src={nft.image} alt={nft?.name} />
        <h2 className="text-xl font-bold pt-2 pb-4">{nft.name}</h2>
      </div>
    ));
  };

  return (
    <>
      <div className="min-w-screen h-screen fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none">
        <div className="absolute bg-black opacity-70 inset-0 z-0" />
        <div className="w-full max-h-full max-w-lg lg:max-w-2xl lg:h-auto p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white overflow-y-auto">
          <div className="text-gray-500">
            <div className="text-center flex-auto justify-center">
              <h2 className="text-xl font-bold pt-4 text-gray-800">
                Mint success
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {renderNftCard()}
              </div>
            </div>
            <div className="mt-2 text-center space-x-4 md:block">
              <button
                className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                onClick={() => onClose()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewNftModal;