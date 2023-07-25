import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import React, { useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import { API } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';

const Blogs = ({ blogs, categories, tags, size }) => {
  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      // ()
      return (
        <article key={i}>
          <div className="lead pb-4">
            <header>
              <Link legacyBehavior href={`/blogs/${blog.slug}`}>
                <a>
                  <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
                </a>
              </Link>
            </header>
            <section>
              <p className="mark ml-1 pt-2 pb-2">
                Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
              </p>
            </section>
            <section>
              <p>blog categories and tags</p>
            </section>

            <div className="row">
              <div className="col-md-4">image</div>
              <div className="col-md-8">
                <section>
                  <div className="pb-3">{renderHTML(blog.excerpt)}</div>
                  <Link legacyBehavior href={`/blogs/${blog.slug}`}>
                    <a className="btn btn-primary pt-2">Read more</a>
                  </Link>
                </section>
              </div>
            </div>
          </div>
          <hr />
        </article>
      );
    });
  };
  
  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                Programming blogs and tutorials
              </h1>
            </div>
            <section>
              <p>show categories and tags</p>
            </section>
          </header>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">{showAllBlogs()}</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

Blogs.getInitialProps = () => {
  return listBlogsWithCategoriesAndTags().then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        size: data.size
      };
    }
  });
};

//getInitialProps hanya dapat digunakan pada halaman bukan dalam komponen

export default Blogs;

/* 

While resolving: frontend@1.0.0
npm ERR! Found: react@18.2.0
npm ERR! node_modules/react
npm ERR!   react@"^18.2.0" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^16.1.0" from react-render-html@0.6.0
npm ERR! node_modules/react-render-html
npm ERR!   react-render-html@"*" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution

Solution adding legacy per deps.
// npm install react-render-html --legacy-peer-deps

*/