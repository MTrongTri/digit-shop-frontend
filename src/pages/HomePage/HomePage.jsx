import Categories from "@/components/Categories/Categories";
import Container from "@/components/Container";
import HomeSlider from "@/components/Slider/HomeSlider";

function HomePage() {
  return (
    <Container>
      <HomeSlider></HomeSlider>
      <Categories></Categories>
    </Container>
  );
}

export default HomePage;
