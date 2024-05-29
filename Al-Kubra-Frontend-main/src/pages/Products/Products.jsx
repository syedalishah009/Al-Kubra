import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/products";
import { useParams } from "react-router-dom";
import SkeletonProductCard from "../../components/SkeletonLoadingComponents/SkeletonProductCard";
import ProductPageCard from "../../components/ProductCard/ProductPageCard";
import { Rating } from "@mui/material";

const sortOptions = [
  { name: "Price: Low to High", current: false },
  { name: "Price: High to Low", current: false },
];

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "", label: "All", checked: true },
      { value: "Uniforms", label: "Uniforms", checked: false },
      { value: "Women's Shirts", label: "Ladies Shirts", checked: false },
      { value: "ladies kurta", label: "Ladies Kurta", checked: false },
      { value: "Abaya", label: "Abaya", checked: false },
      { value: "kids", label: "Kids", checked: false },
      { value: "socks", label: "Socks", checked: false },
      { value: "Shawl", label: "Shawls", checked: false },
      { value: "sweater", label: "Sweaters", checked: false },
      { value: "Frocks", label: "Frocks", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Products = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState();
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 30000]);
  const [ratings, setRatings] = useState(5);
  const [value, setValue] = useState(10000);
  const [isFocused, setIsFocused] = useState(false);

  const handleRangeChange = (e) => {
    setValue(e.target.value);
    setPrice([0, value]);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const { keyword } = useParams();

  let current = 1;

  const {
    data,
    refetch,
    isRefetchError,
    isRefetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage + 1;
    },
    queryFn: () =>
      getProducts({ keyword, price, category, ratings, pageParam: current }),
  });

  useEffect(() => {
    refetch();
  }, [keyword, category, price, ratings, refetch]);

  // if (status === "loading") return <h1>Loading...</h1>;

  // if (status === "error") return <h1>{JSON.stringify(error)}</h1>;

  const current1 = data?.pages.flatMap((page) => page.page);

  const products = data?.pages.flatMap((page) => page.products);

  const handleSortClick = async (name) => {
    if (name === "Price: Low to High") {
      products.sort((product1, product2) => product1.price - product2.price);
      setSelectedSortOption("Price: Low to High");
    } else if (name === "Price: High to Low") {
      products.sort((product1, product2) => product2.price - product1.price);
      setSelectedSortOption("Price: High to Low");
    }
  };

  const handleClick = () => {
    current = current1[current1.length - 1];
    current += 1;
    fetchNextPage();
  };

  return (
    <div className="bg-white">
      <div>
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 "
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul className="px-2 py-3 font-medium text-gray-900">
                      <li>
                        <span className="block px-2 py-3">Best Rating</span>
                      </li>
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      type="radio"
                                      defaultChecked={option.checked}
                                      onChange={(e) =>
                                        setCategory(option.value)
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-end border-b border-gray-200 pb-6 mt-4">
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 cursor-pointer">
                      {sortOptions.map((option) => (
                        <Menu.Item
                          key={option.name}
                          onClick={() => handleSortClick(option.name)}
                        >
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                selectedSortOption === option.name
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="flex">
              <form className="hidden lg:block lg:w-1/4">
                <h3 className="sr-only">Categories</h3>
                <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium">
                  <li>
                    <Rating
                      value={ratings}
                      precision={0.5}
                      onChange={(e) => setRatings(e.target.value)}
                    />
                    <hr className="mt-2" />
                  </li>
                  <li>
                    <div className="flex flex-col items-center relative mt-4">
                      <div className="w-full flex justify-between text-gray-500">
                        <span>Rs.0</span> <span>Rs.10000</span>
                      </div>
                      {isFocused && (
                        <span className="absolute -top-4 text-black font-bold">
                          Rs.{value}
                        </span>
                      )}
                      <input
                        type="range"
                        className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                        min="0"
                        max="10000"
                        step="1"
                        value={value}
                        onChange={handleRangeChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                  </li>
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="radio"
                                  defaultChecked={false}
                                  onClick={(e) => setCategory(e.target.value)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
              <div className="flex flex-wrap lg:ml-2">
                {status === "loading"
                  ? [1, 2, 3].map((i) => <SkeletonProductCard />)
                  : null}
                {status === "error" ? <h1>Error</h1> : null}
                {isLoading || isRefetching
                  ? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((i) => (
                      <SkeletonProductCard />
                    ))
                  : products?.map((productItem) => (
                      <ProductCard
                        productItem={productItem}
                        key={productItem._id}
                      />
                    ))}
                {hasNextPage && (
                  <p
                    className="w-full text-center text-[#e94560] cursor-pointer"
                    onClick={handleClick}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "Loading..." : "Load More"}
                  </p>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Products;
