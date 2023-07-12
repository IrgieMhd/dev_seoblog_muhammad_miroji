import Layout from "../components/Layout";
import SignupComp from "../components/auth/SignupComp";

const Signup = () => {
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Halaman Register</h2>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <SignupComp />
        </div>
      </div>
    </Layout>
  )
}

export default Signup