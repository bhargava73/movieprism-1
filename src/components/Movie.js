import React, { useEffect, useState } from "react";
import lostSvg from "../images/lost.svg";
import styled from "styled-components";
import playPng from "../images/play.png";
import movieBackAlt from "../images/movieBackAlt.svg";
import movieAlt from "../images/movieAlt.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import dotenv from "dotenv";
import "./movie.css";
dotenv.config();

const DETAILS1 = "https://api.themoviedb.org/3/movie/";
const DETAILS2 = `?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`;
const IMG_API = "https://image.tmdb.org/t/p/w1280";

const YOUTUBE_PATH = "https://www.youtube.com/watch?v=";

const Movie = ({ match }) => {
	let ID = useState(match.params.id);
	let [movie, setMovie] = useState([]);
	let [flag, setFlag] = useState(1);
	let [videos, setVideos] = useState([]);
	let [genres, setGenres] = useState([]);
	const [isOpen, setOpen] = useState(false);

	useEffect(() => {
		console.log(DETAILS1 + ID + DETAILS2);
		getMovie(DETAILS1 + ID + DETAILS2);
	}, []);

	let resVideos;
	let resGenres;

	const getMovie = (API) => {
		fetch(API)
			.then((res) => res.json())
			.then((data) => {
				if (data.title !== undefined) {
					setFlag(1);
					setMovie(data);
					console.log(data.videos);
					if (data.videos !== undefined) {
						resVideos = data.videos.results;
						playVid();
						console.log(data.videos);
					} else {
						console.log(5);
					}
					if (data.genres !== undefined) {
						resGenres = data.genres;
						getGenres();
						console.log(data.videos);
					} else {
						console.log(5);
					}
				} else {
					setFlag(0);
				}
			});
	};

	const getGenres = () => {
		let lst = [];
		for (let i = 0; i < resGenres.length; i++) {
			lst.push(resGenres[i]);
		}
		setGenres(lst);
	};

	const playVid = () => {
		if (resVideos.length !== 0 && resVideos.length !== undefined) {
			let vids = [];
			let vidkeys = [];
			for (let i = 0; i < resVideos.length; i++) {
				// if (resVideos[i].official === true && resVideos[i].type === "Trailer") {
				// 	setVidKey(resVideos[i].key);
				// 	break;
				// }
				vids.push(resVideos[i]);
			}
			setVideos(vids);
		}
	};

	const Div = styled.div`
		background: url(${movie.backdrop_path ? IMG_API + movie.backdrop_path : movieBackAlt});
		background-position: center;
		background-size: cover;
		background-attachment: fixed;
		background-repeat: no-repeat;
	`;

	const Span = styled.span`
		display: block;
		z-index: 999;
		position: fixed;
		font-size: 50px;
		color: #fff;
		top: 0;
		left: 0;
		margin-left: 20px;
	`;

	return (
		<div>
			{flag ? (
				<div>
					<Div>
						<div className="bg"></div>
						<Link to="/" id="backicon">
							<Span>
								<ArrowBackIosNewIcon />
							</Span>
						</Link>
						<div className="banner">
							<div className="content">
								<div className="poster">{movie.poster_path ? <img src={IMG_API + movie.poster_path} /> : <img src={movieAlt} />}</div>
								<div className="contents">
									<h2>{movie.title}</h2>
									<h6>{movie.tagline}</h6>
									{movie.vote_average === "" ? "" : <div className="vote-rate">{movie.vote_average}</div>}
									<p>{movie.overview}</p>
									<ul>
										{genres.map((genre) => (
											<li key="genre.id">{genre.name}</li>
										))}
									</ul>
									{movie.release_date === "" && movie.runtime === "" ? (
										""
									) : (
										<ul>
											{movie.release_date === "" ? "" : <li>{movie.release_date}</li>}
											{movie.runtime === "" ? "" : <li>{movie.runtime} min</li>}
										</ul>
									)}
								</div>
							</div>
							<div className="videos">
								<h3>Videos</h3>
								<ul>
									{videos.map((video) => (
										<li key="video.id">
											<div className="yt-video">
												<iframe width="250" height="141" src={`https://www.youtube.com/embed/${video.key}`} onClose={() => setOpen(false)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
											</div>
											{/* <iframe width="250" height="141" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
										</li>
									))}
								</ul>
							</div>
						</div>
					</Div>
				</div>
			) : (
				<div class="err-container">
					<h2 class="err-title">Oops!!</h2>
					<p class="err-text">I think you are lost. Don't worry... Let me take you back to the homepage.</p>
					<img src={lostSvg} alt="Lost" class="err-lost-image" />
					<Link to="/" class="err-btn">
						Take me to homepage
					</Link>
				</div>
			)}
		</div>
	);
};

export default Movie;
