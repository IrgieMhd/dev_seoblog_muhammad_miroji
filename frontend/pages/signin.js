import Layout from "../components/Layout"
import SigninComp from "../components/auth/SigninComp";

const Signin = () => {
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Halaman Login</h2>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <SigninComp />
        </div>
      </div>
    </Layout>
  )
}

export default Signin