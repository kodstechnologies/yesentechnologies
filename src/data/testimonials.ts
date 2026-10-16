// Client voices testimonials shown on the homepage.
// Written testimonials are real client statements.
// Video testimonials are demo placeholders until real footage arrives.
export const SHOW_DEMO_TESTIMONIALS = true;

import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";

export type WrittenTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar?: string;
};

export type VideoTestimonial = {
  id: string;
  title: string;
  name: string;
  role: string;
  videoUrl?: string;
  posterImage?: string;
  thumbnailUrl?: string;
  isDemo: boolean;
};

export const WRITTEN_TESTIMONIALS: WrittenTestimonial[] = [
  {
    id: "w1",
    quote:
      "Yesen has provided us with an innovative energy storage hybrid solution so we could avoid DC gensets on our houseboats. It cuts fuel costs and removes noise and vibration for our guests.",
    name: "Max Molteni",
    role: "Houseboat operator",
    avatar: testimonial1,
  },
  {
    id: "w2",
    quote:
      "One of the world's first fully solar powered luxury tented resorts. Designed and executed to the highest standard four years ago — and still performing flawlessly.",
    name: "Deepak Mawandia",
    role: "Managing Director, Topan Yala",
    avatar: testimonial2,
  },
  {
    id: "w3",
    quote:
      "We consider this team one of the top five speciality design and engineering teams in the world. Their experience in renewable energy is unparalleled.",
    name: "Mathew Segal",
    role: "Sr. Vice President, Trojan Battery Co., USA",
    avatar: testimonial3,
  },
  {
    id: "w4",
    quote:
      "With the aim of building an eco resort, we partnered Yesen to design and implement technologies that would make us carbon neutral. Their attitude to take on challenges and find innovative solutions impressed us greatly.",
    name: "Z Ibraham",
    role: "Malaysia",
  },
  {
    id: "w5",
    quote:
      "Quanta Power Solutions entered into an engineering and technical partnership with Yesen for design, engineering, installation and commissioning services across South Asian countries — projects worth more than US$ 15 million. All the projects are working to our complete satisfaction and we consider the capability of its team among the best in the world.",
    name: "Vineet Poddar",
    role: "Quanta Power Solutions",
    avatar: testimonial5,
  },
  {
    id: "w6",
    quote:
      "Yesen brought clarity, engineering depth and genuine commitment to our project. They delivered a reliable renewable energy system on time and continue to support us well beyond commissioning.",
    name: "Bhavesh Patel",
    role: "Director, Sustainable Infrastructure",
  },
];

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "v1",
    title: "Solar resort, four years on",
    name: "Deepak Mawandia",
    role: "Managing Director, Topan Yala",
    isDemo: true,
  },
  {
    id: "v2",
    title: "Silent houseboat retrofit",
    name: "Max Molteni",
    role: "Houseboat operator",
    isDemo: true,
  },
  {
    id: "v3",
    title: "Engineering partnership at scale",
    name: "Vineet Poddar",
    role: "Quanta Power Solutions",
    isDemo: true,
  },
];

export function visibleWrittenTestimonials() {
  return WRITTEN_TESTIMONIALS;
}

export function visibleVideoTestimonials() {
  return VIDEO_TESTIMONIALS.filter((t) => SHOW_DEMO_TESTIMONIALS || !t.isDemo);
}
