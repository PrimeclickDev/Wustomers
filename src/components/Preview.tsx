/* eslint-disable react/display-name */
import { CampaignFormData } from 'models/shared'
import { forwardRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

type PreviewProps = {
	activeView: string
	campaign: CampaignFormData
}

type Ref = HTMLIFrameElement

export const Preview = forwardRef<Ref, PreviewProps>(
	({ activeView, campaign }, ref) => {
		const logo = URL.createObjectURL(campaign.productLogo[0])
		const bgImg = campaign.bgImage
			? URL.createObjectURL(campaign.bgImage[0])
			: null

		const renderHTML = renderToStaticMarkup(
			<>
				<header className='header'>
					<div className='container'>
						<img
							src={logo}
							alt={`${campaign.campaignTitle} logo`}
							width='200'
						/>
					</div>
				</header>
				<main>
					<section className='hero'>
						<div className='container'>
							<p className='subtitle'></p>
							<h2 className='title'>{campaign.headerContent}</h2>
							<p className='paragraph'>{campaign.subheadingContent}</p>
							<button className='hero-btn'>{campaign.buttonText}</button>
						</div>
					</section>

					<section className='why-section'>
						<div className='container'>
							<h2 className='why-title'>Why you should choose us</h2>
							<ul className='why-lists'>
								<li>Access to thousands of Infographics template.</li>
								<li>Saves time and energy</li>
								<li>Unlimited Access to Templates</li>
								<li>Easy to Use - No Design Skill Needed</li>
								<li>Access to Monthly News Update</li>
							</ul>
						</div>
					</section>

					<section className='posts-section'>
						<div className='container'>
							{campaign?.socials.length > 0 ? (
								<ul className='posts'>
									{campaign?.socials.map(social => (
										<li className='post' key={social.id}>
											<img
												src={social.media_url}
												alt=''
												className='post-img'
											/>
											<p>{social.caption}</p>
										</li>
									))}
								</ul>
							) : null}
						</div>
					</section>

					{campaign.testimonials.length ? (
						<section className='testimonials-section'>
							<div className='container'>
								<h3>Testimonials</h3>

								<ul className='testimonials'>
									{campaign.testimonials?.map(data => (
										<li key={data.name}>
											<p>{data.comment}</p>
											<h4>
												{data.name} - {data.designation}
											</h4>
										</li>
									))}
								</ul>
							</div>
						</section>
					) : null}
				</main>

				<footer className='footer'>
					<div className='container'>
						<h3>{campaign.campaignTitle}</h3>

						<div className='contact-info'>
							<h4>Contact information</h4>
							<div className='contact'>
								<i className='bx bxs-map'></i>
								<p>{campaign.officeAddress}</p>
							</div>
							<div className='contact'>
								<i className='bx bxs-phone'></i>
								<a href='tel:+2348076119515'>{campaign.phoneNumber}</a>
							</div>
							<div className='contact'>
								<i className='bx bxs-envelope'></i>
								<a href='mail:wustoemers@gmail.com'>{campaign.email}</a>
							</div>
						</div>
					</div>
				</footer>
			</>
		)

		const htmlToRender = `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<link
					href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
					rel="stylesheet"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossorigin
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap"
					rel="stylesheet"
				/>
				<title>Wustomers test page</title>

				<style>
					:root {
						font-size: 10px;
						--main-clr: rgb(28, 28, 28);
						--netural-clr: #fafafa;
					}
					html {
						scroll-behavior: smooth;
					}
					*:where(:not(iframe, canvas, img, svg, video):not(svg *, a)) {
						all: unset;
						display: revert;
					}

					*,
					*::before,
					*::after {
						box-sizing: border-box;
						margin: 0;
						padding: 0;
					}
					ol,
					ul {
						list-style: none;
					}
					img,
					picture {
						max-width: 100%;
						display: block;
					}
					h1,
					h2,
					h3 {
						line-height: 1.2;
					}
					a {
						color: currentColor;
						text-decoration: none;
					}
					.page-body {
						font-family: 'Poppins', sans-serif;
						line-height: 1.5;
						font-size: 1.6rem;
						background-color: var(--netural-clr);
						color: var(--main-clr);
					}
					.container {
						max-width: 1500px;
						margin: 0 auto;
						width: 100%;
						padding: 0 1rem;
					}
					h1 {
						font-size: 2.5rem;
						padding: 1rem;
					}
					.header {
						padding: 0.5rem;
						font-weight: 700;
					}
					.header .container {
						display: flex;
						align-items: center;
						justify-content: ${campaign.logoPosition};
						padding: 1rem 0;
					}
					.header img {
						width: 40px;
					}
					.hero {
						text-align: center;
						padding: 10rem 2rem;
						background-color: rgba(28, 28, 28, 0.8);
						background-image: url('${bgImg}');
						background-repeat: no-repeat;
						background-size: cover;
						background-blend-mode: multiply;
						color: var(--netural-clr);
						min-height: 600px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}
					.hero .container {
						max-width: 80ch;
					}
					.hero .subtitle {
						text-transform: uppercase;
						font-size: 1.4rem;
						letter-spacing: 1px;
						color: #d5d5d5;
					}
					.hero .title {
						font-size: 5.5rem;
						font-weight: 900;
					}
					.hero .paragraph {
						padding-top: 2.5rem;
						max-width: 60ch;
						margin: 0 auto;
					}
					.hero-btn {
						padding: 1rem 4rem;
						background: var(--netural-clr);
						color: var(--main-clr);
						border-radius: 3px;
						margin-top: 5rem;
						cursor: pointer;
						transition: opacity 0.5s ease-in-out;
					}
					.hero-btn:hover {
						opacity: 0.8;
					}
					.why-section .container {
						padding: 10rem 2rem;
						display: grid;
						place-items: center;
						text-align: center;
					}
					.why-section .why-title {
						font-size: 3rem;
						font-weight: 700;
					}
					.why-lists {
						display: flex;
						flex-direction: column;
						gap: 1.2rem;
						margin-top: 2rem;
					}
					.posts-section {
						padding-bottom: 10rem;
						/* padding-top: 5rem; */
					}
					.posts-section .container {
						max-width: 1200px;
					}
					.posts {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
						gap: 2rem;
						margin-top: 3rem;
					}
					.post {
						background: var(--main-clr);
						color: var(--netural-clr);
						border-radius: 4px;
						overflow: hidden;
					}
					.post p {
						padding: 1.5rem;
					}
					.post-img {
						width: 100%;
						height: 250px;
						object-fit: cover;
					}
					.testimonials-section {
						padding: 10rem 0;
						background: #ddd;
					}
					.testimonials-section h3 {
						text-align: center;
						font-weight: 600;
						font-size: 3rem;
					}
					.testimonials {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
						gap: 2rem;
						max-width: 1200px;
						margin: 3rem auto;
					}
					.testimonials li {
						background: var(--netural-clr);
						padding: 2rem 3rem;
						border-radius: 2px;
						box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
					}
					.testimonials p {
						line-height: 1.8;
					}
					.testimonials h4 {
						padding-top: 1rem;
						font-weight: 600;
					}
					.footer {
						background: var(--main-clr);
						color: var(--netural-clr);
						padding: 10rem 2rem;
					}
					.footer .container {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}
					.footer h3 {
						font-size: 3rem;
						font-weight: 900;
					}
					.footer .contact-info {
						max-width: 40ch;
						display: grid;
						place-items: center;
						gap: 3rem;
						margin-top: 2rem;
					}
					.footer h4 {
						text-transform: uppercase;
						letter-spacing: 2px;
					}
					.footer .contact {
						display: flex;
						flex-direction: column;
						align-items: center;
						text-align: center;
						gap: 1.5rem;
					}
					.footer i {
						background: var(--netural-clr);
						padding: 0.5rem;
						border-radius: 2px;
						color: var(--main-clr);
						font-size: 2.5rem;
					}
					.footer a:hover {
						text-decoration: underline;
					}
					@media screen and (max-width: 767px) {
						.hero {
							min-height: 300px;
						}
						.hero .title {
							font-size: 4rem;
						}
					}
				</style>
			</head>
			<body class="page-body">
				${renderHTML}
			</body>
		</html>
	`

		return (
			<iframe
				ref={ref}
				height={1500}
				className='mx-auto'
				width={activeView === 'mobile' ? '360px' : '100%'}
				srcDoc={htmlToRender}
			/>
		)
	}
)