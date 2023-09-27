import React, { useState, useEffect } from 'react';
import "./SingleBlog.scss";
import { BiUser, BiCommentDots } from 'react-icons/bi';
import { MdOutlineAddReaction } from "react-icons/md";
import author from "../../assets/images/author.png";
import Comment from '../Comment/Comment';
import { useBlogsContext } from '../../context/blogsContext';
import { Link } from "react-router-dom";
import Loader from '../Loader/Loader';

const SingleBlog = ({ blog, user, comments }) => {
    const { tempBlogs, singleBlogLoading, singleBlogError } = useBlogsContext();
    const [userEnteredPrice, setUserEnteredPrice] = useState('');
    const [placeholderMessage, setPlaceholderMessage] = useState('');
    const [governmentPrice, setGovernmentPrice] = useState(null); // State to store government price data

    const handleUserInput = (event) => {
        setUserEnteredPrice(event.target.value);
    };

    const handleSubmit = () => {
        // Your existing code for handling user input and displaying messages

        // After handling user input, fetch government price data
        fetchGovernmentPrice(); // Define this function
    };

    // Function to fetch government price data
    const fetchGovernmentPrice = () => {
        // Use fetch or axios to make an API request to get government price data
        // Example using fetch:
        fetch('https://api.example.com/government-price', {
            method: 'GET',
            // Add any headers or query parameters needed
        })
        .then(response => response.json())
        .then(data => {
            setGovernmentPrice(data); // Set the government price data in state
        })
        .catch(error => {
            console.error('Error fetching government price data', error);
        });
    };

    useEffect(() => {
        // Fetch government price data when the component mounts (optional)
        fetchGovernmentPrice();
    }, []);

    if (singleBlogLoading) {
        return (<Loader />);
    }

    return (
        <div className='blog-single grid'>
            <div className='blog-single-l'>
                <div className='blog-details'>
                    <div className='blog-info flex align-center'>
                        <div className='blog-info-item flex align-center'>
                            <BiUser className='text-mid-blue' />
                            <span className='blog-info-item-text font-rubik fw-5'>{user?.firstName} {user?.lastName}</span>
                        </div>
                        <div className='blog-info-item flex align-center'>
                            <BiCommentDots className='text-mid-blue' />
                            <span className='blog-info-item-text font-rubik fw-5'>{comments?.length} comment(s)</span>
                        </div>
                        <div className='blog-info-item flex align-center'>
                            <MdOutlineAddReaction className='text-mid-blue' />
                            <span className='blog-info-item-text font-rubik fw-5'>{blog?.reactions}</span>
                        </div>
                    </div>

                    <h2 className='blog-title text-dark-blue'>{blog?.title}</h2>
                    <p className='blog-text'>{blog?.body}</p>
                    <div className='blog-tags flex align-item my-4'>
                        {/* <span className='blog-tags-title'>Popular Tags:</span>
                        <div className='blog-tags-list flex align-center'>
                            {
                                blog?.tags?.map((tag, idx) => (
                                    <span className='blog-tags-item fs-13 font-rubik text-uppercase text-white ls-1' key={idx}>{tag}</span>
                                ))
                            }
                        </div> */}
                    </div>

                    {/* Display government price data */}
                    {governmentPrice && (
                        <div className='government-price'>
                            <h3>Government Price</h3>
                            <p>{governmentPrice.price}</p>
                        </div>
                    )}

                    {/* Display the placeholder message based on user input */}
                    <div className='placeholder-message'>
                        {placeholderMessage && <p>{placeholderMessage}</p>}
                    </div>

                    <div className='comment-input'>
                        <input
                            type='number'
                            placeholder='Enter price'
                            value={userEnteredPrice}
                            onChange={handleUserInput}
                        />
                    </div>

                    <div className='submit-button'>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>

            <div className='blog-single-r'>
                <div className='recent-blogs'>
                    <h2 className='font-rubik my-3 fw-6'>Recent News</h2>
                    <div className='recent-blogs-list grid'>
                        {
                            tempBlogs.slice(0, 5).map(blog => {
                                return (
                                    <div className='recent-blogs-item' key={blog.id}>
                                        <Link to={`/blog/${blog.id}`}>
                                            <h3>{blog?.title}</h3>
                                        </Link>
                                        <div className='flex align-center'>
                                            <MdOutlineAddReaction /> &nbsp;
                                            <span>{blog?.reactions}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleBlog;
