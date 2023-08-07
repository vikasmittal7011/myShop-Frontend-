import Header from "../components/common/Header";
import ViewProduct from "../components/cart/ViewProduct";
import ViewTotal from "../components/cart/ViewTotal";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
];

const Cart = () => {
  return (
    <>
      <Header heading="Cart" />
      <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
        <ViewProduct products={products} />
        <ViewTotal />
      </div>
    </>
  );
};

export default Cart;
