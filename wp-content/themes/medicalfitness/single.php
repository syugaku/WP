<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since Twenty Nineteen 1.0
 */
$discussion = ! is_page() && twentynineteen_can_show_post_thumbnail() ? twentynineteen_get_discussion_data() : null;

get_header();
?>

<div class="page-inner detail_page">
	
	<?php
		$categories_list = get_the_category_list( __( ' , ', 'twentynineteen' ) );
		if ( $categories_list ) {
			printf(
				/* translators: 1: SVG icon. 2: Posted in label, only visible to screen readers. 3: List of categories. */
				'<div class="single_category">カテゴリー：<span>%3$s</span></div>',
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

	<?php the_title( '<h2 class="detail_page__ttl">', '</h2>' ); ?>
	<div class="_mb-s detail_page__wrap">
		<span class="detail_page__author">
			著者：<?php 
			while ( have_posts() ) : 
				the_post();
				printf(
					'<a class="url fn n" href="%1$s">%2$s</a>',
					esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
					esc_html( get_the_author() )
				);
			endwhile;
		?>
		</span>
		<span class="detail_page__time">
		<?php
			$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
			if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
				$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
			}

			$time_string = sprintf(
				$time_string,
				esc_attr( get_the_date( DATE_W3C ) ),
				esc_html( get_the_date() ),
				esc_attr( get_the_modified_date( DATE_W3C ) ),
				esc_html( get_the_modified_date() )
			);

			printf(
				'%3$s',
				twentynineteen_get_icon_svg( 'watch', 16 ),
				esc_url( get_permalink() ),
				$time_string
			);
		?>
		</span>
	</div>
	<?php
		$post = get_post( get_the_ID() );
		echo apply_filters('the_content', $post->post_content); //固定ページの内容
	?>

	<div class="nav-single-links _mt-m">
		<div class="nav-previous">
			<?php $prevpost = get_adjacent_post(true, '', true);
			if ($prevpost) : ?>
				<?php $postImage = getPostImage($prevpost);
				if ($postImage != null) { //記事内に画像があったら 
				?>
					<a href="<?php echo get_permalink($prevpost->ID); ?>" class="">
						<span class="recommend before">以前の記事</span>
						<span class="thum_img" style="background-image: url(<?php echo $postImage["url"]; ?>);background-size: cover;background-position: center; background-repeat: no-repeat;"></span>
						<span class="title"><?php if (mb_strlen($prevpost->post_title) > 20) {
																	$title = mb_substr($prevpost->post_title, 0, 20);
																	echo $title . ･･･;
																} else {
																	echo $prevpost->post_title;
																} ?></span>
					</a>
				<?php } else { //サムネイルが設定されていなく、記事内に画像も無かったら 
				?>
					<a href="<?php echo get_permalink($prevpost->ID); ?>" class="">
						<span class="recommend before">以前の記事</span>
						<span class="thum_img" style="background-image: url(/assets/images/common/thumbnail.jpg);background-size: cover;background-position: center; background-repeat: no-repeat;"></span>
						<span class="title"><?php if (mb_strlen($prevpost->post_title) > 20) {
																	$title = mb_substr($prevpost->post_title, 0, 20);
																	echo $title . ･･･;
																} else {
																	echo $prevpost->post_title;
																} ?></span>
					</a>
				<?php } ?>
			<?php else : endif; ?>
		</div>

		<div class="nav-next">
			<?php $nextpost = get_adjacent_post(true, '', false);
			if ($nextpost) : ?>
				<?php $postImage2 = getPostImage($nextpost);
				if ($postImage2 != null) { //記事内に画像があったら 
				?>
					<a href="<?php echo get_permalink($nextpost->ID); ?>" class="">
						<span class="recommend next">以降の記事</span>
						<span class="thum_img" style="background-image: url(<?php echo $postImage2["url"]; ?>);background-size: cover;background-position: center; background-repeat: no-repeat;"></span>
						<span class="title"><?php if (mb_strlen($nextpost->post_title) > 20) {
																	$title = mb_substr($nextpost->post_title, 0, 20);
																	echo $title . ･･･;
																} else {
																	echo $nextpost->post_title;
																} ?></span>
					</a>
				<?php } else { //サムネイルが設定されていなく、記事内に画像も無かったら 
				?>
					<a href="<?php echo get_permalink($nextpost->ID); ?>" class="">
						<span class="recommend next">以降の記事</span>
						<span class="thum_img" style="background-image: url(/assets/images/common/thumbnail.jpg);background-size: cover;background-position: center; background-repeat: no-repeat;"></span>
						<span class="title"><?php if (mb_strlen($nextpost->post_title) > 20) {
																	$title = mb_substr($nextpost->post_title, 0, 20);
																	echo $title . ･･･;
																} else {
																	echo $nextpost->post_title;
																} ?></span>
					</a>
				<?php } ?>

			<?php else : endif; ?>
		</div>
	</div>

<?php
get_footer();
