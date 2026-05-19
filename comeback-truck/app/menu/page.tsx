import type { Metadata } from "next";
import MenuCard from "@/components/ui/MenuCard";
import MustardDivider from "@/components/ui/MustardDivider";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full Comeback Truck menu — slow-smoked BBQ ribs, pulled pork, chili cheese fries, fried catfish, mac & cheese, and the Carolina mustard sauce that gives us our name.",
};

const mains = [
  {
    number: "01",
    title: "BBQ Ribs Plate",
    description: "Slow-smoked baby back ribs with two sides.",
    price: "$14",
  },
  {
    number: "02",
    title: "Pulled Pork Sandwich",
    description:
      "Smoked pork shoulder on a bun, topped with our Carolina mustard sauce.",
    price: "$10",
  },
  {
    number: "03",
    title: "Chili Cheese Dog",
    description:
      "All-beef hot dog, house chili, melted cheese, served with crinkle fries.",
    price: "$9",
  },
  {
    number: "04",
    title: "Fried Fish Basket",
    description: "Crispy battered catfish with crinkle fries.",
    price: "$12",
  },
  {
    number: "05",
    title: "Stuffed Meatloaf",
    description: "House-made meatloaf, glazed and finished hot.",
    price: "$11",
  },
];

const loaded = [
  {
    number: "06",
    title: "Chili Cheese Fries",
    description: "Crinkle fries, ground beef, melted cheese, scallions.",
    price: "$8",
  },
  {
    number: "07",
    title: "Mac & Cheese",
    description: "Creamy 3-cheese baked mac.",
    price: "$5",
  },
  {
    number: "08",
    title: "Potato Salad",
    description: "Southern-style with mustard kick.",
    price: "$4",
  },
  {
    number: "09",
    title: "Crinkle Fries",
    description: "Golden, crispy, seasoned.",
    price: "$4",
  },
];

export default function MenuPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-ct-black smoke-overlay py-24 md:py-32 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-ct-mustard/10 blur-[140px] top-[-200px] left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container-ct relative z-10 text-center">
          <span className="text-ct-mustard uppercase tracking-widest text-xs md:text-sm font-semibold font-sans">
            The Menu
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ct-cream uppercase leading-tight mt-6">
            The Full <span className="text-ct-mustard">Spread</span>
          </h1>
          <MustardDivider className="mx-auto mt-8" />
          <p className="text-ct-cream-muted text-base md:text-lg mt-6 max-w-2xl mx-auto">
            What we serve up daily. Menu rotates seasonally.
          </p>
        </div>
      </section>

      {/* MAINS */}
      <section className="bg-ct-charcoal py-20 md:py-24">
        <div className="container-ct">
          <div className="flex flex-col items-start mb-10">
            <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
              Section One
            </span>
            <MustardDivider className="mt-3" />
            <h2 className="font-display text-3xl md:text-5xl text-ct-cream uppercase leading-tight mt-3">
              Mains
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mains.map((item) => (
              <MenuCard key={item.number} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* LOADED & EXTRAS */}
      <section className="bg-ct-black py-20 md:py-24">
        <div className="container-ct">
          <div className="flex flex-col items-start mb-10">
            <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
              Section Two
            </span>
            <MustardDivider className="mt-3" />
            <h2 className="font-display text-3xl md:text-5xl text-ct-cream uppercase leading-tight mt-3">
              Loaded &amp; Extras
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loaded.map((item) => (
              <MenuCard key={item.number} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* SAUCES & SIDES */}
      <section className="bg-ct-charcoal py-20 md:py-24">
        <div className="container-ct">
          <div className="flex flex-col items-start mb-10">
            <span className="text-ct-mustard uppercase tracking-widest text-xs font-semibold font-sans">
              Section Three
            </span>
            <MustardDivider className="mt-3" />
            <h2 className="font-display text-3xl md:text-5xl text-ct-cream uppercase leading-tight mt-3">
              Sauces &amp; Sides
            </h2>
          </div>

          <div className="bg-ct-surface border border-ct-border p-8 md:p-12">
            <p className="text-ct-cream-muted text-base md:text-lg leading-relaxed">
              Ask about our house Carolina mustard sauce, hot honey, and
              seasonal specials.
            </p>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-ct-black py-12">
        <div className="container-ct">
          <p className="text-ct-muted text-sm text-center max-w-2xl mx-auto">
            Menu and pricing subject to change. Follow{" "}
            <a
              href="https://www.instagram.com/_thecomebacktruck/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ct-mustard hover:text-ct-mustard-light transition-colors"
            >
              @_thecomebacktruck
            </a>{" "}
            on Instagram for daily specials.
          </p>
        </div>
      </section>
    </>
  );
}
