import { useState, Fragment, useRef, useContext, useEffect } from "react";

import { CryptoLogos, Loading } from "web3uikit";

import { Web3Provider } from "../../contexts/connect.context";

import { shortenAddress } from "../../utils/shortenAddress.util";
import { ipfsUriToHttps } from "../../utils/ipfsUriToHttps.util";

import { NFT_CONTRACTS as nftContractAddress } from "../../utils/constants";

const initiSelectNFT = {
  selected: false,
  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEX///+/v7+8vLzKysr8/Pzg4ODFxcXb29vT09Pj4+P4+PjBwcH6+vry8vLY2NjIyMjs7Ozo6Oia8u11AAAEdUlEQVR4nO2d65bqIAxGp/Smrb34/i971KqlEC7FGuJZ3/7dKewJBgK4/PsDAAAAAAAAAAAAAAAA4KUam5+i3m94UsUPoVoYwlA6MIShfGAIQ/nAEIbyOcBQSeNww9NZGOXBhuq8+w1fxugfDG1gmB0YBoFhdmAYBIbZgWEQGGYHhkFgmB0YBoFhdmAYBIbZyWB4qVI6mgyv4WUeH7u007lL7vFeWA3n8rUFrZqWK5KchnWvPapOTGFkNDQPOJrhk45Hw2d4Ns+oVPlRz2NhMxyawkTtv2OWAJvhSBwzfjBO2+g/5TLs7BDeSF4eDP0Y+yiX4UydFKtT4pRxa3SKTcVchtQgLYrobhq0Kj7+XIb0aX+fZtipHfH/ScPlZZG5Jq9hk2RYP96lTnFPcxnWpGF52d2eNrPGPc5lOJC5NDrl65Sv1fs16nEuw8v20sdCP+9uTh8NZVSuYVvTnKlBmjAdaqu/uH8Qm2FVWuNUJYSwOu3tLV9tcelNw5SF9yZjRaVixvpwbrZRTKnyuyKysRXOGn/QBqpK25QzptVm9598eyfqXDaPnah+GlNmwr/aGOcqYl3DvJtYzXU7jvU1bbVmVdExE+pP7Qjb6TiiOBFmOPuyD7XyC+djWYadGt2KxE5PzMpWluHtXc6KQZ/rNYK5RpThfWXnrGzp6iRcQ0ky7KbHK+iBup3rtQZD6wZJhq+9HDIsri89BBsUZPguIal0Y871K6ECRY6hXkFaimQeXQjVUHIMNwWkuVax5/q1xcC6Rozh0G+7vYmidaqzCaJ/whBjaEZJr608Y7QIHvBIMbR3/dfB55jr3/hrKCGGxMHN+vmi53rtSW+uEWLYUj1/dsY1169tetc1MgwHaw9HU3TN9Svec0huw4os6CZHcO7dcc/163O+XMNteC0JRfdk0Aby6BNfDcW9i1EquzedI4R36vAYLfy5htnwtnBRvaHo/SZxjN8Nz7UO5ltf97WnMgbqHCfhRbmHKa/hdXl2qxjzQQsaunMNr+FzUlD62W8bORD9TM4gshpe3xVg+Z7BonJlmN55mMhpWGkV4GughtacsbgvLnAa6hXga6B666I9OGsoRsPtMbCa7l2q6OVaAs6uMxpejXDdd+SPSTMP+vyGdri6+bAQui8u8BmaIbwxUdcXkg0dNRTjOf6BNiSOGirrXYxjcXQ+632ag6EPE7kMiU/h4dA1FJfhgUnTzZTRkCOEt8apYcpj+P1E6u4+j+H3E+kCdUmKxZAjkS4QrbMY8nwKC7qGYjFkSaQL9rqGw5AthORhIoMhUyJ9ksPwsDI+Brv97xtWY8mJNUwZYtixYu0qyjhd+yYwDALD7MAwCAyzA8MgMMwODIPAMDtHGxZ1JYvjDRvWajCC7SYRfhsBhvKBIQzlA0MYygeGMJQPDGEoHxjCUD4whKF8YAhD+cAQhvKBIQzlA0MYygeGMJQPDGEoHxjCUD4whKF8YAhD+cAQhvJJM/wpEgyv9U+R8iNaAAAAAAAAAAAAAAAAAP4r/gEYCYE2Xwz6DQAAAABJRU5ErkJggg=="
};

const Converse = () => {
  const { chain, isReload, account, nftConverse, ChangeChain, myCollection, GetCollection, ConverseNFT, nftContract } = useContext(Web3Provider);

  const refSelectFromChain = useRef();
  const refSelectNFT = useRef();
  const refSelectToChain = useRef();
  const [selectNFT, setSelectNFT] = useState(initiSelectNFT);

  const onChangeFromChain = async () => {
    ChangeChain(Number.parseInt(refSelectFromChain.current.value));
  };

  const onChangeNFT = () => {
    const getNFT = myCollection.list.find((x) => x.edition === Number.parseInt(refSelectNFT.current.value));
    if (getNFT) {
      setSelectNFT({ selected: true, image: ipfsUriToHttps(getNFT.image) });
    } else {
      setSelectNFT(initiSelectNFT);
    }
  };

  const onChangeToChain = () => {
    console.log(refSelectToChain.current.value);
  };

  const onApprove = () => {
    console.log("onApprove");
    ConverseNFT({
      name: "Test",
      from: "X",
      to: "Y"
    });
  };
  useEffect(() => {
    if (account && nftContract) {
      GetCollection();
    }
  }, [account, isReload, nftContract]);

  return (
    <Fragment>
      <div className="h-screen w-screen">
        <div className="container md:container md:mx-auto">
          <div className="text-7xl font-dark font-extrabold mb-8 text-center">NFT Converse</div>

          <div className="flex">
            <div className="lg:w-1/3 md:w-2/3 w-3/3 mx-auto">
              <div className="py-4 px-8 shadow-lg rounded-lg my-10 backdrop-blur-lg bg-[#323652]/50">
                <div className="flex justify-center -mt-16">
                  <CryptoLogos
                    chain={nftContractAddress[chain]?.Icon}
                    size="6.5rem"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="bg-slate-400/20 py-5 -mt-7 rounded-3xl">
                    <h2 className="text-2xl font-semibold mt-2 text-center">Address Wallet</h2>
                    <h2 className="text-2xl font-semibold mt-2 text-center">{shortenAddress(account)}</h2>
                  </div>
                  <div className="flex items-end mt-3 mx-auto">
                    <div className="text-white text-xl lg:text-3xl font-bold mr-4">From: </div>
                    <div className="inline-block relative w-full text-gray-700 mt-4">
                      <select
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        ref={refSelectFromChain}
                        onChange={() => onChangeFromChain()}
                      >
                        {Object.keys(nftContractAddress).map((key, index) => {
                          return (<option selected={chain === Number.parseInt(key)} key={index} value={key}>{nftContractAddress[key]?.Label}</option>);
                        })}
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end mt-3 mx-auto">
                    <div className="text-white text-xl lg:text-3xl font-bold mr-4">NFT: </div>
                    <div className="inline-block relative w-full text-gray-700 mt-4">
                      <select
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        ref={refSelectNFT}
                        onChange={() => onChangeNFT()}
                      >
                        <option>{myCollection.loading ? "Loading..." : (myCollection?.list.length > 0) ? "Please Select NFT" : "NFT No Record!"}</option>
                        {myCollection?.list.map((data, key) => {
                          return (<option key={key} value={data.edition}>{data.name}</option>);
                        })}
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-5">
                    <img
                      className="w-48 h-48 lg:w-72 lg:h-72 object-cover border-4 border-yellow-500"
                      src={selectNFT?.image}
                      alt="selected_nft"
                    />
                  </div>

                  <div className="flex items-end mt-3 mx-auto">
                    <div className="text-white text-xl lg:text-3xl font-bold mr-4">To: </div>
                    <div className="inline-block relative w-full text-gray-700 mt-4">
                      <select
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        ref={refSelectToChain}
                        onChange={() => onChangeToChain()}
                      >
                        <option>-</option>
                        {Object.keys(nftContractAddress).map((key, index) => {
                          return (chain !== Number.parseInt(key) ? <option key={index} value={key}>{nftContractAddress[key]?.Label}</option> : "");
                        })}
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </div>
                  {selectNFT?.selected && (
                    <div className="bg-slate-400/20 p-5 mt-8 mb-3 rounded-3xl">
                      <div className="flex">
                        <div className="w-1/2">
                          Fee
                        </div>
                        <div className="w-1/2 text-right">
                          0.00005 ETH
                        </div>
                      </div>
                      <div className="flex mt-1">
                        <div className="w-1/2">
                          Estimated Time
                        </div>
                        <div className="w-1/2 text-right">
                          5-20 minutes
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-end my-5 mx-auto">
                    <button
                      disabled={!selectNFT?.selected || nftConverse.loading}
                      className="w-48 px-4 py-2 btn-connect btn-converse disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => onApprove()}
                    >
                      {nftConverse.loading ? (<Loading fontSize={20} size={20} text="Transfer" direction="right" />) : "Approve"}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Converse;