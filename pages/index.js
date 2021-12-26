import Head from "next/head";
import CategoryPreviews from "../components/CategoryPreviews";
import Footer from "../components/Footer";
import Listing from "../components/Listing";
import MetaData from "../components/MetaData";
import PrivateRoute from "../components/PrivateRoute";
import ProductQuickviews from "../components/ProductQuickviews";
import Promo from "../components/Promo";
import StoreNavigation from "../components/StoreNavigation";

export default function Home() {
  return (
    <>
      <MetaData title="Dashboard | Acquco" />
      <PrivateRoute>
        <StoreNavigation />
        <Promo />
        <CategoryPreviews />
        <Listing />
        <ProductQuickviews />
        <Footer />
      </PrivateRoute>
    </>
  );
}
