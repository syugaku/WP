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
<?php
$cat = get_the_category(); // 情報取得
$catId = $cat[0]->cat_ID; // ID取得
$catName = $cat[0]->name; // 名称取得
$catSlug = $cat[0]->category_nicename; // スラッグ取得
$link = get_category_link($catId); // リンクURL取得
$the_query = new WP_Query($args);
$postcat = get_the_category();
?>
<style>
	.mv {
		margin-bottom: 70px;
	}
	.doorList {
		margin-top: 70px;
	}
	.article_list {
		width: 900px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.article_ele {
		width: 47%;
	}
	.article_ele + .article_ele + .article_ele {
		margin-top: 40px;
	}
	.article_ele__thumbnail {
		margin-bottom: 15px;
		height: 220px;
    width: 100%;
		border-radius: 10px;
	}
	.article_ele__txt_wrap {
		margin-right: 5px;
		margin-left: 5px;
	}
	.article_top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.article_top__data {
    background-color: #000;
    padding: 0 10px;
    color: #fff;
    font-size: 14px;
		line-height: 1.5;
	}
	.article_top__author {
		font-size: 14px;
		font-family: serif;
	}
	.article_ele__txt_wrap--ttl {
		margin-top: 5px;
		font-size: 20px;
		font-weight: lighter;
	}
	.article_ele__txt_wrap--category {
		margin-top: 5px;
		color: #898989;
		font-size: 12px;
	}
	.article_ele__txt_wrap--txt {
		margin-top: 5px;
		font-size: 14px;
		word-break: break-all;
	}
</style>
		<div id="search">
			<form method="get" action="<?php bloginfo( 'url' ); ?>">
				<input name="s" id="s" type="text" />
				<?php wp_dropdown_categories('depth=0&orderby=name&hide_empty=1&show_option_all=カテゴリー選択'); ?>
				<input id="submit" type="submit" value="検索" />
			</form>
		</div>
		<ul class="article_list">
			<?php if(have_posts()): while(have_posts()): the_post(); ?>
			<li class="article_ele">
				<a href="<?php the_permalink(); ?>">
					<div class="article_ele__thumbnail" style="background-image: url(<?php echo catch_that_image(); ?>); background-size: cover; background-position: center;"></div>
				</a>
				<div class="article_ele__txt_wrap">
					<div class="article_top">
						<span class="article_top__data"><?php echo get_the_date(); ?></span>
						<span class="article_top__author">著者：<?php the_author(); ?></span>
					</div>
					<h4 class="article_ele__txt_wrap--ttl"><?php the_title(); ?></h4>
					<p class="article_ele__txt_wrap--category">
					カテゴリ：
					<?php $postcat = get_the_category();
						foreach($postcat as $index) :?>
						<?php echo $punto . $index->cat_name; ?>
					<?php endforeach;?>
					</p>
					<p class="article_ele__txt_wrap--txt">
					<?php 
						$limitTxt = get_the_content();
						$limitTxt = wp_strip_all_tags( $limitTxt );
						if (mb_strlen($limitTxt) >= 100) {
							$limitTxt = mb_substr($limitTxt,0,100) . "…";
						}
						echo $limitTxt;
					?>
					</p>
				</div>
			</li>
			<?php endwhile; endif; ?>
		</ul>
	<?php get_footer();
