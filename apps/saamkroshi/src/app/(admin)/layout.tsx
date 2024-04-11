import { Layout } from "@melony/views";
import Nav from "./nav";
import Account from "./account";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: ChatLayoutProps) {
  return (
    <Layout logo={<Logo />} navigation={<Nav />} account={<Account />}>
      {children}
    </Layout>
  );
}

export const Logo = () => {
  return (
    <svg
      height="24px"
      width="24px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <path
        style={{ fill: "#FA6E51" }}
        d="M0,256.006C0,397.402,114.606,512.004,255.996,512C397.394,512.004,512,397.402,512,256.006
	C512.009,114.61,397.394,0,255.996,0C114.606,0,0,114.614,0,256.006z"
      />
      <path
        style={{ fill: "#E8573F" }}
        d="M506.375,309.443c-0.4-0.507-79.632-79.781-80.218-80.218c-1.361-1.829-3.435-3.092-5.89-3.092
	c-4.124,0-7.467,3.34-7.467,7.467V256H222.27c-0.315-0.337-0.706-0.607-1.035-0.932c-0.477-0.533-32.855-32.862-33.367-33.367
	c-4.27-4.771-9.927-8.518-16.571-10.427l-2.659-0.763c-0.369-0.436-70.427-70.449-71.013-70.885
	c-1.362-1.83-3.436-3.092-5.891-3.092c-4.123,0-7.467,3.339-7.467,7.467v224c0,2.457,1.263,4.531,3.092,5.89
	c0.436,0.588,0.93,1.081,1.517,1.517c0.435,0.586,132.873,133.025,133.459,133.459c0.284,0.382,0.644,0.674,0.986,0.987
	c10.707,1.364,21.597,2.146,32.675,2.146C379.064,512.002,481.796,425.174,506.375,309.443z"
      />
      <path
        style={{ fill: "#F4F6F9" }}
        d="M420.267,226.133c-4.124,0-7.467,3.34-7.467,7.467V256H192.716c1.199-2.164,2.214-4.434,2.8-6.898
	c3.774-15.939-7.091-32.908-24.22-37.829l-47.527-13.643c-8.413-2.406-17.276-1.467-24.57,2.43V144c0-4.127-3.343-7.467-7.467-7.467
	c-4.124,0-7.467,3.34-7.467,7.467v224c0,4.127,3.343,7.467,7.467,7.467c4.124,0,7.467-3.34,7.467-7.467v-37.333h52.267v22.4
	c0,4.127,3.343,7.467,7.467,7.467h216.533c4.124,0,7.467-3.34,7.467-7.467v-22.4h29.867V368c0,4.127,3.343,7.467,7.467,7.467
	c4.124,0,7.467-3.34,7.467-7.467V233.6C427.733,229.473,424.39,226.133,420.267,226.133z M99.554,221.539
	c1.028-4.346,3.919-6.818,6.161-8.13c2.494-1.458,5.433-2.202,8.491-2.202c1.794,0,3.628,0.255,5.44,0.773l47.527,13.643
	c9.418,2.705,15.743,11.886,13.81,20.037c-1.028,4.346-3.919,6.818-6.165,8.13c-3.952,2.311-9.035,2.829-13.938,1.429l-47.52-13.643
	C103.943,238.871,97.621,229.692,99.554,221.539z M99.2,315.733v-64.621c3.024,2.046,6.348,3.755,10.037,4.814l42.229,12.123v47.684
	H99.2z M368,345.6H166.4v-74.667H368V345.6z M382.933,315.733v-44.8H412.8v44.8H382.933z"
      />
    </svg>
  );
};
