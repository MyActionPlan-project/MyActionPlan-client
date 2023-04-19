import './HomePage.css';
import { Image } from 'react-bootstrap';

function HomePage() {
  return (
    <div className=" homeDiv d-flex justify-content-center align-items-center flex-column">
     <Image className="homeImg rounded-circle m-5" src="/homeimg.jpg" alt="homeImg" fluid />
      <p className="homeText text-center">Welcome to MyActionPlan! We're so excited to have you here. Our mission is to help you achieve your goals and make your dreams a reality. We know that life can get overwhelming at times, but with MyActionPlan, you can take control and stay on track. Our platform is designed to be user-friendly and customizable, so you can create a plan that's tailored to your needs and preferences. Whether you're looking to crush your fitness goals, ace your exams, do it yourself(diy), plan your vacation, or simply stay organized, we've got everything you need to succeed. So why not give it a try? Sign up today and flex your steps in whatever way you want!</p>
    </div>
  );
}

export default HomePage;
