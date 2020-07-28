<?php
/**
 * WordPress の基本設定
 *
 * このファイルは、インストール時に wp-config.php 作成ウィザードが利用します。
 * ウィザードを介さずにこのファイルを "wp-config.php" という名前でコピーして
 * 直接編集して値を入力してもかまいません。
 *
 * このファイルは、以下の設定を含みます。
 *
 * * MySQL 設定
 * * 秘密鍵
 * * データベーステーブル接頭辞
 * * ABSPATH
 *
 * @link https://ja.wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// 注意:
// Windows の "メモ帳" でこのファイルを編集しないでください !
// 問題なく使えるテキストエディタ
// (http://wpdocs.osdn.jp/%E7%94%A8%E8%AA%9E%E9%9B%86#.E3.83.86.E3.82.AD.E3.82.B9.E3.83.88.E3.82.A8.E3.83.87.E3.82.A3.E3.82.BF 参照)
// を使用し、必ず UTF-8 の BOM なし (UTF-8N) で保存してください。

// ** MySQL 設定 - この情報はホスティング先から入手してください。 ** //
/** WordPress のためのデータベース名 */
define( 'DB_NAME', 'wp' );

/** MySQL データベースのユーザー名 */
define( 'DB_USER', 'root' );

/** MySQL データベースのパスワード */
define( 'DB_PASSWORD', 'root' );

/** MySQL のホスト名 */
define( 'DB_HOST', 'localhost' );

/** データベースのテーブルを作成する際のデータベースの文字セット */
define( 'DB_CHARSET', 'utf8mb4' );

/** データベースの照合順序 (ほとんどの場合変更する必要はありません) */
define( 'DB_COLLATE', '' );

/**#@+
 * 認証用ユニークキー
 *
 * それぞれを異なるユニーク (一意) な文字列に変更してください。
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org の秘密鍵サービス} で自動生成することもできます。
 * 後でいつでも変更して、既存のすべての cookie を無効にできます。これにより、すべてのユーザーを強制的に再ログインさせることになります。
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'fvOoa{w-o-9Q!v98>PmS3a.|u73PB*3s2f+Vy,42W55JOzu-#vcafS/[$qXJ,O;Y' );
define( 'SECURE_AUTH_KEY',  '!c^o1,)jPHY`C, -L45kh|Mf4YOLJs7Ali2.TEm+|}UEhUKj<ZMv^Yv>Sa!nzpLU' );
define( 'LOGGED_IN_KEY',    ')oaJZLBS LXsr8J|[K,eGPW(P>fD83]7F(,a:tC&!s+81$l}:dN71I=oVB`Cl0^*' );
define( 'NONCE_KEY',        'K%qY/dvWW&^8]L2c?7Gfk*!|,qNZS6FeT0E|WD+;T]^O -rEI_SUCyu@TUtm(:-)' );
define( 'AUTH_SALT',        '>])6W1tcIe1j|r[C>B(L*pleLF@?.s&-q|[myx=U9<Ihy hHXt2A!/HY<_:t~ PS' );
define( 'SECURE_AUTH_SALT', '0ZvcTt3S:KS4gBw!2?gN~|v_#77{X?mboF8v ]MmC&T2ed*|,TlYQ+>HHXGWzMgL' );
define( 'LOGGED_IN_SALT',   '{xMnAJ9/A2uX52%6fNTbR]+4M<:vdE)cLA;vmjc2b!4I&U(]2TtU7r;l4/wo,@so' );
define( 'NONCE_SALT',       'R9OZ<7`[!2`YFjJxS:OA,;n79wPn1D1KRvVb$m]H%`9fY,( 8Tb/w#{l~gqZb%U]' );

/**#@-*/

/**
 * WordPress データベーステーブルの接頭辞
 *
 * それぞれにユニーク (一意) な接頭辞を与えることで一つのデータベースに複数の WordPress を
 * インストールすることができます。半角英数字と下線のみを使用してください。
 */
$table_prefix = 'wp_';

/**
 * 開発者へ: WordPress デバッグモード
 *
 * この値を true にすると、開発中に注意 (notice) を表示します。
 * テーマおよびプラグインの開発者には、その開発環境においてこの WP_DEBUG を使用することを強く推奨します。
 *
 * その他のデバッグに利用できる定数についてはドキュメンテーションをご覧ください。
 *
 * @link https://ja.wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* 編集が必要なのはここまでです ! WordPress でのパブリッシングをお楽しみください。 */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
