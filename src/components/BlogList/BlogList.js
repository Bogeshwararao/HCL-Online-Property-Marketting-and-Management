import React, { useState } from 'react';
import "./BlogList.scss";
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { useBlogsContext } from '../../context/blogsContext';
import Loader from '../Loader/Loader';
import img3 from "../assets/imgprop3.jpg"
import img4 from "../assets/imgprop4.jpg"
import img2 from "../assets/imgprop2.jpg"
import img1 from "../assets/imgprop1.jpg"
import img5 from "../assets/imgprop5.jpg"
import img6 from "../assets/imgprop6.jpg"
// import log from '../logo512.png';
// import image3 from '../image3.jpg'; // Import the new image
// import image4 from '../image4.jpg'; // Import another new image
// Import more images as needed

const BlogList = ({ blogs }) => {
    const { blogsLoading, searchBlogsLoading } = useBlogsContext();
    const blogLimit = 6;
    const [paginate, setPaginate] = useState(1 * blogLimit);
    const paginateHandler = (value) => setPaginate(value * blogLimit);
    if (blogsLoading || searchBlogsLoading) { return (<Loader />) }

    // Define an array of image URLs
    const imageUrls = [
        img1, 
        img2,
        img3,
        img4,
        img5,
        img6,
        
    ];

    // Function to get the image URL for a given index, looping if needed
    const getImageUrl = (index) => {
        const imageUrlIndex = index % imageUrls.length;
        return imageUrls[imageUrlIndex];
    };

    return (
        <>
            <div className="blog-items grid my-6">
                {blogs.slice(paginate - 6, paginate).map((blog, index) => {
                    const imageUrl = getImageUrl(index); // Get the image URL based on the current index
                    return (
                        <div className="blog-item" key={blog.id}>
                            <img
                                className='blog-item-image'
                                src={imageUrl}
                                alt={blog.title}
                            />
                            <div className='blog-item-title fw-5 fs-18 font-rubik'>{blog.title}</div>
                            <div className='blog-item-text'>{(blog.body).substring(0, 100)}...</div>
                            
                            <div className='blog-item-btn'>
                                <Link to={`/blog/${blog.id}`} className="read-more-btn font-rubik fw-4">Read More</Link>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Pagination noOfBlogs={blogs.length} paginateHandler={paginateHandler} />
        </>
    );
}

export default BlogList;
