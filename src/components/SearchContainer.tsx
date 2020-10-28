import React from 'react';
import HomeImageSVG from 'resources/home-image.svg';

const SearchContainer = () => {
  return (
    <div className="bg-primary-light h-auto rounded-lg my-12">
      <div className="grid grid-cols-5">
        <div className="col-span-3 mt-32 ml-16">
          <h1 className="mb-8 text-4xl font-medium">
            What video do you need today?
          </h1>
          <div className="h-14 w-11/12 p-1 rounded border-solid border-2 bg-white flex focus-within:shadow-outline hover:shadow-outline">
            <input
              placeholder="Search by topic or keyword"
              className="h-full w-full ml-2 focus:outline-none"
            />
            <button className="w-48 text-white bg-primary rounded font-medium text-lg hover:bg-primary-hover active:bg-primary-active focus:shadow-button-focus focus:outline-none">
              <div className="flex justify-center w-full">
                <span className="mr-3 mt-1">
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <g
                      id="Symbols"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="Search-button"
                        transform="translate(-20.000000, -12.000000)"
                        fill="#FFFFFF"
                        fillRule="nonzero"
                      >
                        <g
                          id="Group"
                          transform="translate(20.000000, 12.000000)"
                        >
                          <g
                            transform="translate(0.000000, 0.456042)"
                            id="icons-/-magnifying-glass"
                          >
                            <path
                              d="M13.5791881,11.9496855 L12.7209834,11.9496855 L12.4168096,11.6563751 C13.481418,10.4179531 14.1223556,8.81017724 14.1223556,7.06117782 C14.1223556,3.16123499 10.9611206,0 7.06117782,0 C3.16123499,0 0,3.16123499 0,7.06117782 C0,10.9611206 3.16123499,14.1223556 7.06117782,14.1223556 C8.81017724,14.1223556 10.4179531,13.481418 11.6563751,12.4168096 L11.9496855,12.7209834 L11.9496855,13.5791881 L17.3813608,19 L19,17.3813608 L13.5791881,11.9496855 Z M7.125,11.875 C4.49666667,11.875 2.375,9.75333333 2.375,7.125 C2.375,4.49666667 4.49666667,2.375 7.125,2.375 C9.75333333,2.375 11.875,4.49666667 11.875,7.125 C11.875,9.75333333 9.75333333,11.875 7.125,11.875 Z"
                              id="Shape"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
                Search
              </div>
            </button>
          </div>
        </div>
        <div className="col-span-2 my-16 mx-6">
          <HomeImageSVG />
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
