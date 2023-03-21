type PreviewProps = {
	activeView: string
}

export const Preview = ({ activeView }: PreviewProps) => {
	return (
		<iframe
			height={1500}
			className='mx-auto'
			width={activeView === 'mobile' ? '427px' : '100%'}
			srcDoc={`
        <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link
			href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
			rel="stylesheet" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap"
			rel="stylesheet" />
		<title>Wustomers test page</title>

		<style>
			:root {
				font-size: 10px;
				--main-clr: rgb(28, 28, 28);
				--netural-clr: rgb(250, 250, 250);
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
				background-color: #ffffff;
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
				text-align: center;
				padding: 0.5rem;
				font-weight: 700;
			}
			.hero {
				text-align: center;
				padding: 10rem 2rem;
				background: var(--main-clr);
				color: var(--netural-clr);
				min-height: 50vh;
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
				border: 2px solid #bdbdbd;
				border-radius: 4px;
				padding: 0.5rem;
			}
			.post div {
				padding: 2rem;
				background: var(--main-clr);
				color: var(--netural-clr);
			}
			.post h3 {
				font-weight: 600;
				font-size: 2rem;
			}
			.post p {
				padding-top: 1rem;
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
				font-size: 1.4rem;
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
				.hero .title {
					font-size: 4rem;
				}
			}
		</style>
	</head>
	<body class="page-body">
		<header class="header">
			<div class="container">
				<h1>Wustomers</h1>
			</div>
		</header>
		<main>
			<section class="hero">
				<div class="container">
					<p class="subtitle">
						Generate personalized persentation slides in hours,
						minutes
					</p>
					<h2 class="title">
						Custom made powerpoint persentation specially made for
						you.
					</h2>
					<p class="paragraph">
						We pride ourselves on over 10,000 PowerPoint slides
						tailored to fit all your business proposals irrespective
						of the niche
					</p>
					<button class="hero-btn">Register now</button>
				</div>
			</section>

			<section class="why-section">
				<div class="container">
					<h2 class="why-title">Why you should choose us</h2>
					<ul class="why-lists">
						<li>Access to thousands of Infographics template.</li>
						<li>Saves time and energy</li>
						<ll> Modern layout and Infographics </ll>
						<li>Unlimited Access to Templates</li>
						<li>Easy to Use - No Design Skill Needed</li>
						<li>Access to Monthly News Update</li>
					</ul>
				</div>
			</section>

			<section class="posts-section">
				<div class="container">
					<ul class="posts">
						<li class="post">
							<img
								src="https://images.pexels.com/photos/15883131/pexels-photo-15883131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
								alt=""
								class="post-img" />
							<div>
								<h3>Posts</h3>
								<p>
									“Editable templates with innovative design
									and very good use of color.”
								</p>
								<p>N20,000</p>
							</div>
						</li>
						<li class="post">
							<img
								src="https://images.pexels.com/photos/15883131/pexels-photo-15883131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
								alt=""
								class="post-img" />
							<div>
								<h3>Posts</h3>
								<p class="paragraph">
									“Editable templates with innovative design
									and very good use of color.”
								</p>
								<p class="amount">N20,000</p>
							</div>
						</li>
						<li class="post">
							<img
								src="https://images.pexels.com/photos/15883131/pexels-photo-15883131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
								alt=""
								class="post-img" />
							<div>
								<h3>Posts</h3>
								<p>
									“Editable templates with innovative design
									and very good use of color.”
								</p>
								<p>N20,000</p>
							</div>
						</li>
					</ul>
				</div>
			</section>

			<section class="testimonials-section">
				<div class="container">
					<h3>Testimonials</h3>

					<ul class="testimonials">
						<li>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Voluptatibus incidunt culpa
								eum velit et voluptatum, deserunt iure,
								perspiciatis placeat quam nisi quisquam, illum
								aut error provident? Voluptatem qui corrupti
								dolores?
							</p>
							<h4>Williams Samuel - CEO</h4>
						</li>
						<li>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Voluptatibus incidunt culpa
								eum velit et voluptatum, deserunt iure,
								perspiciatis placeat quam nisi quisquam, illum
								aut error provident? Voluptatem qui corrupti
								dolores?
							</p>
							<h4>Williams Samuel - CEO</h4>
						</li>
						<li>
							<p>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Voluptatibus incidunt culpa
								eum velit et voluptatum, deserunt iure,
								perspiciatis placeat quam nisi quisquam, illum
								aut error provident? Voluptatem qui corrupti
								dolores?
							</p>
							<h4>Williams Samuel - CEO</h4>
						</li>
					</ul>
				</div>
			</section>
		</main>

		<footer class="footer">
			<div class="container">
				<h3>Wustomers</h3>

				<div class="contact-info">
					<h4>Contact information</h4>
					<div class="contact">
						<i class="bx bxs-map"></i>
						<p>
							Plot M, Unit A, Samuel Ajiboye, Megamound Estate,
							Lekki-Epe Expressway, Lagos State, Nigeria.
						</p>
					</div>
					<div class="contact">
						<i class="bx bxs-phone"></i>
						<a href="tel:+2348076119515">+2348076119515</a>
					</div>
					<div class="contact">
						<i class="bx bxs-envelope"></i>
						<a href="mail:wustoemers@gmail.com"
							>wustomers@gmail.com</a
						>
					</div>
				</div>
			</div>
		</footer>
	</body>
</html>

      `}
		/>
	)
}
