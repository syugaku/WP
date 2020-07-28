<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since Twenty Nineteen 1.0
 */
$cat = get_the_category(); // 情報取得
$catId = $cat[0]->cat_ID; // ID取得
$catName = $cat[0]->name; // 名称取得
$catSlug = $cat[0]->category_nicename; // スラッグ取得
$link = get_category_link($catId); // リンクURL取得
?>

<!doctype html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>湘南メディカルフィットネス六本木店のブログ｜会員制の医療×ダイエットをコンセプトとしたフィットネスクラブ</title>
  <meta name="description"
    content="当店では、100年時代を医療と生きるをコンセプトに、医療を通じて「見た目も中身も健康である」ことを目指しています。無理なダイエットは内臓に負担をかけてしまいます。健康的にダイエットを行いたい方、生活習慣病の解消をしたい方は、ぜひ湘南メディカルフィットネス六本木店にご相談ください。">
  <meta name="keywords" content="フィットネス,メディカルフィットネス,医療ダイエット,生活習慣病予防,医療費控除,会員">
	<link rel="canonical" href="https://www.sbc-medicalfitness-roppongi.com/">
  <meta name=”robots” content=”noindex”>
  <link rel="stylesheet" href="https://www.sbc-medicalfitness-roppongi.com/assets/css/common.css">
  <link rel="stylesheet" href="/blog/wp-content/themes/medicalfitness/common.css">
	<?php wp_head(); ?>
  <script src="/assets/js/common.min.js" defer="defer"></script>
  <script src="/assets/js/lib/jquery.min.js"></script>
  <script src="/assets/js/f-common.js" defer="defer"></script>
  <script
    type="application/ld+json">{"@context":"http://schema.org","@type":"MedicalClinic","image":"https://www.sbc-medicalfitness-roppongi.com/common-img/logo-ver3.png","name":"湘南メディカルフィットネス六本木店","telephone":"0120-490-089","url":"https://www.sbc-medicalfitness-roppongi.com"}</script>
  <script>window.addEventListener
      ("load", function () {
        setTimeout(function () {
          !function (e, t, n, a, o) { e[a] = e[a] || [], e[a].push({ "gtm.start": (new Date).getTime(), event: "gtm.js" }); var s = t.getElementsByTagName(n)[0], i = t.createElement(n); i.async = !0, i.src = "https://www.googletagmanager.com/gtm.js?id=GTM-K668TG6", s.parentNode.insertBefore(i, s) }(window, document, "script", "dataLayer")
        },
          1e3)
      })</script><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K668TG6" height="0" width="0"
			style="display:none;visibility:hidden"></iframe></noscript>
</head>

<body class="page-Fp_00_0001">
  <header class="header" id="header">
    <div class="header__inner">
      <div class="header__leftArea">
        <div class="header__leftArea__logo">
          <div class="header__leftArea__logo__img"><a href="/index.html"><img
                src="/assets/images/common/logo.png?202072211424" alt="湘南メディカルフィットネス六本木店"></a></div>
        </div>
      </div>
      <div class="header__rightArea _pc-none"><span class="header__rightArea__hamburger hamburger"></span></div>
    </div>
  </header>
  <nav class="navi-global" id="navi-global">
    <ul>
      <li><a href="/index.html">TOP</a></li>
      <li><a href="/about/index.html">ABOUT</a></li>
      <li><a href="/concept/index.html">CONCEPT</a></li>
      <li><a href="/greeting/index.html">GREETING</a></li>
      <li><a href="/partner/index.html">PARTNER</a></li>
      <li><a href="/medical-fitness/index.html">MEDICAL FITNESS</a></li>
      <li><a href="/flow/index.html">FLOW</a></li>
      <li><a href="/facilities/index.html">FACILITIES</a></li>
      <li><a href="/price/index.html">PRICE</a></li>
      <li><a href="/faq/index.html">Q&A</a></li>
      <li><a href="/access/index.html">ACCESS</a></li>
      <li><a href="/medical/index.html">MEDICAL</a></li>
    </ul>
  </nav>
  <div class="breadcrumb">
    <ul class="inner">
      <li><a href="/">HOME</a></li>
      <?php if (is_home() || is_front_page()) : ?>
        <li class="-current">
          <h1>ブログ 記事一覧</a></span>
        </li>
      <?php endif; ?>
      <?php if (is_category()) : ?>
        <li>
          <a href="/">ブログ 記事一覧</a>
        </li>
        <li class="-current">
          <h1><?php echo $catName; ?>カテゴリのブログ一覧</h1>
        </li>
      <?php elseif (is_author()) : ?>
        <li>
          <a href="/">ブログ 記事一覧</a>
        </li>
        <li class="-current">
          <h1><?php the_author(); ?>のブログ</h1>
        </li>
      <?php endif; ?>
      <?php if (is_single()) : ?>
        <li>
          <a href="/">ブログ 記事一覧</a>
        </li>
        <li class="-current">
          <h1>
            <?php
              if (mb_strlen(get_the_title()) >= 20) {
                $limitTitle = mb_substr(get_the_title(),0,20) . "…"; 
              } else {
                $limitTitle = get_the_title();
              }
              echo $limitTitle; 
            ?>
          </h1>
        </li>
      <?php endif; ?>
    </ul>
  </div>
  <main>
		<section class="mv" style="background-image: url(/assets/images/mv_sitemap.jpg);">
      <div class="mv__txt">
        <h2 class="yumin">BLOG</h2>湘南メディカルフィットネス六本木店の<br class="_pc-none">ブログです。
      </div>
    </section>