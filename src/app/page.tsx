import Cart from "./components/Cart";
import MenuCategories from "./components/MenuCategories";

export default function Home() {
  return (
    <div className="flex gap-6 lg:p-8 bg-bg-secondary lg:bg-bg-primary">
      <MenuCategories />
      <Cart />
    </div>
  );
}
