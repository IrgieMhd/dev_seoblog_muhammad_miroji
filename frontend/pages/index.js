import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => {
  return (
    <Layout>
      <article className="overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-4 font-weight-bold">
                NOVEL MIROJI BLOGS
              </h1>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center pt-4 pb-5">
              <p className="lead">
                Cerita tentang novel miroji sebagai contoh development blog bla bla bla
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="flip flip-horizontal">
                <div
                  className="front"
                  style={{
                    backgroundImage:
                      'url(' +
                      'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                      ')'
                  }}
                >
                  <h2 className="text-shadow text-center h1">Iman</h2>
                </div>
                <div className="back text-center">
                  <Link legacyBehavior href="/categories/iman">
                    <a>
                      <h3 className="h1">Iman</h3>
                    </a>
                  </Link>
                  <p className="lead">Definisi tentang iman apa saja</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="flip flip-horizontal">
                <div
                  className="front"
                  style={{
                    backgroundImage:
                      'url(' +
                      'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                      ')'
                  }}
                >
                  <h2 className="text-shadow text-center h1">Fiqih</h2>
                </div>
                <div className="back text-center">
                  <Link legacyBehavior href="/categories/fiqih">
                    <a>
                      <h3 className="h1">Fiqihqu</h3>
                    </a>
                  </Link>
                  <p className="lead">
                    Mengenai tentang fiqih cara cara dalam islam
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="flip flip-horizontal">
                <div
                  className="front"
                  style={{
                    backgroundImage:
                      'url(' +
                      'https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg' +
                      ')'
                  }}
                >
                  <h2 className="text-shadow text-center h1">Fiqih</h2>
                </div>
                <div className="back text-center">
                  <Link legacyBehavior href="/categories/fiqih">
                    <a>
                      <h3 className="h1">fiqihQyu</h3>
                    </a>
                  </Link>
                  <p className="lead">Penjelasan tentang fiqih</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Index;

//static page