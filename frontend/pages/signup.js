import Layout from "../components/Layout";
import SignupComp from "../components/auth/SignupComp";
import Link from 'next/link';

const Signup = () => {
  return (
    <Layout>
      <h2>Halaman Register</h2>
      <SignupComp />
    </Layout>
  )
}

export default Signup