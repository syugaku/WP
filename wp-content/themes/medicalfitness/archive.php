<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since Twenty Nineteen 1.0
 */
$count_posts = wp_count_posts();
$num = $count_posts->publish;
get_header();
?>
	<div class="_mb-m">
		<?php the_posts_pagination(
			array(
				'prev_next' => false,
				'type'      => 'list',
			)
		); ?>
	</div>
	<ul class="article_list">
		<?php if(have_posts()): while(have_posts()): the_post(); ?>
		<li class="article_ele">
			<a href="<?php the_permalink(); ?>" class="article_ele__thumbnail--wrap">
				<div class="article_ele__thumbnail" style="background-image: url(
				<?php if (has_post_thumbnail()) : ?>
					<?php 
						$image_id = get_post_thumbnail_id ();
						$image_url = wp_get_attachment_image_src ($image_id, true);
						echo $image_url[0];
					?>
				<?php else : ?>
					<?php echo catch_that_image(); ?>
				<?php endif ; ?>); background-size: cover; background-position: center;"></div>
			</a>
			<div class="article_ele__txt_wrap">
				<div class="article_top">
					<span class="article_top__data"><?php echo get_the_date(); ?></span>
					<span class="article_top__author">著者：<?php the_author_posts_link(); ?></span>
				</div>
				<a href="<?php the_permalink(); ?>" class="article_ele__txt_wrap--ttl"><?php the_title(); ?></a>
				<p class="article_ele__txt_wrap--category">
				<?php
					$categories_list = get_the_category_list( __( ' / ', 'twentynineteen' ) );
					if ( $categories_list ) {
						printf(
							/* translators: 1: SVG icon. 2: Posted in label, only visible to screen readers. 3: List of categories. */
							'カテゴリー：<span>%3$s</span>',
							twentynineteen_get_icon_svg( 'archive', 16 ),
							__( 'Posted in', 'twentynineteen' ),
							$categories_list
						); // WPCS: XSS OK.
					}

					/* translators: Used between list items, there is a space after the comma. */
					$tags_list = get_the_tag_list( '', __( ', ', 'twentynineteen' ) );
					if ( $tags_list ) {
						printf(
							/* translators: 1: SVG icon. 2: Posted in label, only visible to screen readers. 3: List of tags. */
							'<span class="tags-links">%1$s<span class="screen-reader-text">%2$s </span>%3$s</span>',
							twentynineteen_get_icon_svg( 'tag', 16 ),
							__( 'Tags:', 'twentynineteen' ),
							$tags_list
						); // WPCS: XSS OK.
					}
				?>
				</p>
				<a href="<?php the_permalink(); ?>" class="article_ele__txt_wrap--txt">
					<?php 
						$limitTxt = get_the_content();
						$limitTxt = wp_strip_all_tags( $limitTxt );
						if (mb_strlen($limitTxt) >= 100) {
							$limitTxt = mb_substr($limitTxt,0,100) . "…";
						}
						echo $limitTxt;
					?>
				</a>
			</div>
		</li>
		<?php endwhile; endif; ?>
	</ul>
	<div class="_mt-l _mt-sp-m">
	<?php the_posts_pagination(
		array(
			'prev_next' => false,
			'type'      => 'list',
		)
	); ?>
	</div>
	<?php get_footer();
