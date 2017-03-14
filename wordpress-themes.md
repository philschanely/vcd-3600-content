---
layout: lesson
title: WordPress Themes
---
## Custom WordPress Themes

### Background
    
Working with themes in WordPress can be simple or complex depending on the site and the design you have in mind. Before you can work with your own custom themes, be sure you have completed the following:

* Create design comps for the pages of the site and complete HTML/CSS build of those comps. It is often simpler to work from existing source than to start from scratch.
* Download the latest version of Wordpress from wordpress.org and install it on a functional web server. This might be your own local testing server, or a remote server. Complete the installation and then log in and create at least some placeholder content that matches elements form your design.
* Establish a smooth connection to your web server in your coding software of choice so that you can easily test your solutions as you work. This could mean working locally before publishing updates to a live server, or working directly in a testing space and later implementing the site in the live setting.

### Setting up a Custom Theme

First we need to set up the appropriate file set for our custom theme. With the site open in a code editor:

1. Add a new folder for your custom theme under `wp-content/themes`.
2. Copy your existing webpage reconstruction files into this folder, being sure that all the images, styles, and any scripts remain linked correctly given the new location of these files.
3. Rename `index.html` to `index.php`, or create `index.php` and place your homepage markup into it. 

    Usually it suffices to create a simple site with just `index.php`, but WordPress allows for different page templates a few different ways. One way is to use the page-based algorithm. See the image below.
    
    ![McCollin, R., and Sliver, T.B. (2013). Wordpress Themed Development Beginner's Guide. Packt Publishing.](http://proquest.safaribooksonline.com/getfile?item=aTE4cjg0MTlhNGFzMjQyN3MvNWQvY3RwbS9lZ3M5YTI0c18xNTNocDAuMmpnX2V0L2cvcHJjaXM0)
    
    What you see here is that when the user navigates the website they have the impression they're navigating between different pages, but WordPress is actually routing every request through a central querying system. This has 12 different branches that determine what specific *kind* of content the user has requested. For example, the first option shown running across the top of the chart checks to see if the page the user requested is the home page. If so, the tempting system will look for a `home.php` file in the theme. If such a file is found, that file is used to display the content the query loads. If not, then `index.php` is used. Likewise along the bottom you can see a more complex process for static pages. First, WP looks for a page named specifically with a custom name; then for a page named `page-` followed by the page's "slug" or alias; then for `page-` followed by the page's id number from WP; then for a more generic `page.php`, and if nothing else, `index.php`. 
    
    So optionally, rename other files you've prepared that correspond to pages for your site based on the following chart, including these common files (see the chart below):
    
    * `single.php` -- a template for a single post.
    * `page.php` -- a template for a static page.
    * `category.php` -- a page for a feed of posts from a given category of posts. 


4. Ensure that your main stylesheet is named precisely style.css. Then add the following code to the top of your main CSS stylesheet:

    ```css
    /*
    Theme Name: __YOUR_THEME_NAME__
    Theme URI: __YOUR_DEVELOPMENT_URL_IF_APPLICABLE__
    Author: __YOUR_NAME__
    Author URI: __YOUR_WEBSITE_IF_APPLICALBE__
    Description: __DESCRIPTION_OF_THEME__
    Version: 
    Tags: 
    */
    ```

5. In any theme PHP files, it is best to have the following as your document opener: 

    ```php
    <!DOCTYPE html>
    <html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <title><?php wp_title(); ?></title>
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
        <link type="text/css" rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" />
        <?php wp_head(); ?>
    </head>
    <body>
    ```
    
    and this as your document closer:
    
    ```php
        <?php wp_footer(); ?>
    </body>
    </html>
    ```
    
    Inevitably, you might need to customize this further in order to link to additional resources. See [WordPress's template file checklist](https://codex.wordpress.org/Theme_Development#Template_File_Checklist) for more information.

6. If you have any images placed directly in any of these template files, you should update their src attribute path to match the following (being sure to match your own local directory for images and the image's filename:

    ```php
    <img src="<?php bloginfo('template_directory'); ?>/path-to-file" />
    ```

    Images in your stylesheet should render correctly on their own as long as you're using relative paths to point to them.


7. Log in to your Wordpress site, go to Appearance > Themes and click Activate on your custom theme.


You should now see your existing webpage build, but it will not yet show actual content from WordPress.

### Common Template Elements

#### Creating A Theme Functions File

Many of the additional components depend on having a set of functions set up specifically for this theme. 

1. In your theme's root folder create `functions.php`. 
2. In it, add an opening `<?php` and you're ready to go.

#### Modular Page Components

In even a basic custom theme we might have several different template files such as `index.php`, `category.php`, `page.php`, and `single.php`. Since these all have different content, the separate pages are necessary. However, they might all have some common elements in a persistent header and footer. WordPress allows us to separate these elements into standalone files and then link them into the other main template files. 

First, be sure you have walked through "Setting up a custom theme" to ensure you've placed the standard elements in the masthead and the footer.

Follow this process:

1. Open a file such as `index.php` that contains your full page structure, including the masthead and footer that is persistent throughout your site.
2. Select and copy the content in this file that represents the persistent header. This can contain the `DOCTYPE`, opening `<html>` tag and the entire `<head>` as well as content that opens the `<body>` tag. 
3. Create a new file called `header.php` inside your theme's root folder. Paste the header content you copied from `index.php` into this file. 
4. Make sure to include `<?php wp_head(); ?>` before the closing `</head>` if you did not put it there already.
5. Switch back to `index.php` and remove the content you had copied into `header.php`. In its place, add the following: `<?php get_header(); ?>`
6. Open each of your other template files and remove the very same set of header content, replacing it with the call to `get_header()`.

Now we'll repeat this process for the footer content. 

7. Back in `index.php` select and copy all the persistent footer content.
8. Create a new file called `footer.php` inside your theme's root folder. Paste the footer content you copied from `index.php` into this file.
9. Make sure to include `<?php wp_footer(); ?>` before the closing `</body>` tag if you did not put it there already.
10. Switch back to `index.php` and remove the content you had copied into `header.php`. In its place, add the following: `<?php get_footer(); ?>`
11. Open each of your other template files and remove the very same set of footer content, replacing it with the call to `get_footer()`.

If applicable, you can repeat the same process for persistent sidebar content by creating `sidebar.php` and replacing any such content in template files with a call to `get_sidebar()`.

#### Incorporating Menus

Since WordPress should be generating the content for our site pages it will also be generating the site navigation. You can account for a primary navigation menu using this snippet in place of any static nav you might have from your prototype build.

```php
<?php 
    wp_nav_menu( array( 
        'theme_location' => 'top',
        'container' => false
    )); 
?>
```

This gives you a `<ul`> with a series of `<li>` for each item in the navigation from WordPress. WordPress also adds a number of class attributes that you can use for additional styling on these items.

#### Adding Widgets for Custom Content

Another common thing we need from our WP system is small bits of custom code that sits alongside a page or post. Sometimes this is unique to a page type and other times you need this to persist across multiple pages. Regardless, we can accomplish this with the widgets feature.

For any such spots, create the container markup you need in the respective files. Then, where you want the content to be placed by WP, add the following:

```php
<?php dynamic_sidebar( '__widgetarea__' ); ?>
```

Change `__widgetarea__` to be a more accurate label for the spot you're creating in your theme. No spaces or special characters allowed. Preferably use all lowercase letters and hyphens between words.

Add as many of these as you need for separate bits of code. Just provide a new name for the widget in place of `__widgetarea__`. You can use the same widget in multiple pages but avoid having a particular widget area repeat on a given page.

However, you must "register" each widget area you define. Here's how you do thiat:

1. Open your theme's `functions.php` file and add the following code:

```php

register_sidebar( array(
	'id'          => '__1__',
	'name'        => '__2__',
	'description' => __( '__3__', 'text_domain' ),
) );

```

Update each placeholder such as `__1__` as follows (be careful not to remove the `'` single quotes):

1. This should match *exactly* the name you used for the widget area in your theme files. 
2. This should be a more user friendly version of the id; its what WP users will see as a label for the area when they edit content.
3. This should describe the purpose and use of this area. 

Learn more from the [WP codex](https://codex.wordpress.org/Widgetizing_Themes#How_to_Register_a_Widget_Area).

With widget areas set up in your theme you can go to the WP admin panel and choose  

### Displaying WordPress Content

WordPress centers around creating posts that are published in blog-like style. This typically assumes that the site will have two particular page templates:

* A home page that contains a feed of all posts sorted from my recent to oldest, and
* A page on which a single post is displayed.

Later we'll discuss how to set these up as separate pages, but suffice to know that you can achieve both through your index.php file using the following approach. First, let's image we're in the setting described by the first bullet, where we want a feed of all posts to appear.

Assuming you're starting with sample content from a static prototype build out---and specifically, one that features a list of articles:

1. Remove all but one of your sample posts from the static content you have in place on this page. You should have a single sample post remaining, perhaps organized in a `<div>`. 
2. Right before the start of the one remaining sample post, add the following lines:

    ```php 
    <?php if (have_posts()) :?>
        <?php while(have_posts()) : the_post(); ?>
    ```
    
In brief, this little bit of WordPress code checks for any posts on the first line, and if there are posts in the system, the next line will be processed. In that second line, a loop is kicked off that will repeat for each post in the system.

3. Right underneath the end of the one remaining sample post, add the following lines:

    ```php
        <?php endwhile; ?> 
    <?php else: ?> 
        <!-- Backup content goes here as needed. -->
    <?php endif; ?> 
    ```

This bit of code finished off the loop, then provides an "otherwise" clause that allows you to provide backup content that would appear if no posts are found in the system.

Now you just need to replace static content in page with PHP tags that bring in specific chunks of content from WordPress for each post. Refer to the following and add each as needed:

* `the_author` -- displays the author's name. Alternatively, you can use `the_author_meta('__value__')` to display a particular piece of data about the author, depending on what you provide for `'__value__'`. You can choose from options such as:
  
    * `'first_name'` -- first name of the post's author.
    * `'last_name'` -- last name of the post's author.

    There are many other options described on [this page](http://codex.wordpress.org/Function_Reference/the_author_meta) from the WordPress Codex. Note that a simpler alternative is to just call `the_author()`.
    
* `the_category(', ')` -- displays a list of any and all categories in which this post is organized, separated by a comma and a space. Note that you can change the contents of the string parameter to be whatever delimiter you'd like. 
* `the_content()` -- displays the content of the post.
* `the_date()` -- displays the date the post was published, by default, using this format:

    ```
    January 1, 2016
    ```

    If you want a date formatted in a different way you should instead use this snippet:
    
    ```php
    <?php echo get_the_date('__format__'); ?>
    ```
    Replace `__format__` (leave the single quotes `'`) with a special character set based on what you can learn about [here](http://codex.wordpress.org/Formatting_Date_and_Time). Some common patterns include:
    
    | string | result |
    |========|========|
    | `'Y-m-d'` | `2016-02-04` |
    | `'M. j, \'y'` | `Feb. 4, '16` |
    | `'F j, Y'` | `February 4, 2016` |
    
* `the_ID()` -- displays the unique ID that WordPress generated for the post.
* `the_permalink()` -- displays the URL of the post.
* `the_title()` -- displays the title of the post.
* `comments_number()` -- displays the number of comments a post currently. Specific parameters can be provided in order to configure what the system should display when there are no comments, when there is 1 comment, and when there is more than 1 comments. See [this page](http://codex.wordpress.org/Function_Reference/comments_number) from the WordPress Codex for more information.
* `post_class()` -- displays the class attribute WordPress generated for the post. 

#### Sample Page Snippets

Put all this together based on your needs and you can create a neatly-formatted feed of posts. Here is an example of how these could be used together:

```php
<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?> 
    <article <?php post_class(); ?>>
        <h2><a href="<?php the_permalink() ?>"><?php the_title();?></a></h2>
        <p>Published on <?php the_date() ?> 
           by <?php the_author(); ?> 
           in <?php the_category(", ") ?></p>
        <div class="entry-content">
            <?php the_content();?>
        </div>
        <p><a href="<?php the_permalink() ?>"><?php comments_number(); ?></a></p>
    </article>
    <?php endwhile; ?>
<?php endif; ?>
```

On the other hand, if you just want a static page that is not meant to be formatted like an article, consider this trimmed-down version:

```php
<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?> 
    <div <?php post_class(); ?>>
        <h2><?php the_title();?></h2>
        <?php the_content();?>
    </div>
    <?php endwhile; ?>
<?php endif; ?>
```

There are many ways to further customize what appears on a given page template. Continue to "Controlling Loops" for more information.

### Controlling Loops

It is very common to build off of the idea of a blog to create customized sites that show off content from one or more categories of posts. Think of a news website. The home page itself might feature some recent news from across the site but then have several sections where top articles from different categories are listed and organized. Furthermore, the site might also have different sections that show only content from a certain category, such as "Sports" or "Local News." In order to accomplish lists of articles like this we can use a lot of the same features as were covered above, but with more fine-tuned control over the specific set of posts we're showing in a certain area. 

#### Working with `query_posts()`

One very powerful tool available to us is the query_posts() method, which allows us to filter a request for WordPress content based on parameters we pass into this function. Here are some options for the parameters:

* `cat` – the id number for a category that would result in filtering the set of posts to those from the provided category.
* `category_name` – similar to the previous, this is the "slug" for a category that results in filtering the set of posts to those from the provided category. 
* `posts_per_page` – indicates how many posts to retrieve "per page." You can use this to determine how many posts get returned, or for more advanced features such as paginating a list of posts. 
* `offset` – indicates how many posts to skip from the beginning of the list before beginning to display. This may be helpful if you have a setup where one post is displayed first as a "featured" post and then followed by a more mundane list of posts. In this case, you'd run to separate calls to `query_posts()`. The first one you'd set `posts_per_page` to `1` and then in the second call you'd set `offset` to `1`. See the examples that follow for more information.
* `order` – sets whether to retrieve posts in ascending order with `'ASC'` or descending order with `'DESC'`. Since the default functionality is to resemble a blog which sorts by post date with the most recent first, `'DESC'` is the default.
* `orderby` – sets what field to order posts by. The default is to order by the post date. A full list of other options can be found [here](#).

#### Example 1: Posts from Two Categories

This snippet shows one way you could display two separate lists of posts from two specific categories, such as on a home page of a news website:

```php
<!-- First we get the most recent 5 posts from the "news" category. -->
<div class="news-posts">
    <h2>News</h2>
    <?php 
        $args = array(
            'category_name' => 'news',
            'posts_per_page' => 5
        );
        query_posts($args); 
    ?>
    <?php if (have_posts) : ?>
    ... [loop code goes here] ... 
    <?php endif; ?>
</div>
<!-- Next we get the most recent 5 posts from the "sports" category. -->
<div class="sports-posts">
    <h2>Sports</h2>
    <?php 
        $args = array(
            'category_name' => 'sports',
            'posts_per_page' => 5
        );
        query_posts($args); 
    ?>
    <?php if (have_posts) : ?>
    ... [loop code goes here] ... 
    <?php endif; ?>
</div>
```

#### Example 2: Featured Post with Simple List Following

This snippet demonstrates how query_posts can be used to query the same category several times in order to treat one set of posts differently from another set.

```php
<div class="sports">
    <!-- First we retrieve the first item from the Sports category to "feature" -->
    <div class="featured">
        <?php 
            $args = array(
                'category_name' => 'sports',
                'posts_per_page' => 1
            );
            query_posts($args);
        ?>
        <?php if (have_posts()) : ?>
            <?php while (have_posts()) : the_post(); ?>
            <!-- We'll show more details for this first post than for others... -->
            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <p>Written by <?php the_author(); ?> on <?php the_date(); ?></p>
            <?php the_content(); ?>
            <?php endwhile; ?>
        <?php endif; ?>
    </div>
    <!-- Next we retrieve the next 5 items and show them in a short list. -->
    <ul>
        <?php 
            $args = array(
                'category_name' => 'sports',
                'posts_per_page' => 5,
                'offset' => 1
            );
            query_posts($args);
        ?>
        <?php if (have_posts()) : ?>
            <?php while (have_posts()) : the_post(); ?> 
            <li><a href="<?php the_permalink() ?>"><?php the_title();?></a></li>
            <?php endwhile; ?>
        <?php endif; ?>
    </ul>
</div>
```

#### Maintaining the Default Query

As convenient as `query_posts()` is one thing to note is that it does cancel the existing query WordPress has generated. On the home page this might not be a bad thing. But on other pages such as `category.php` we will benefit from leaving more of WordPress's hard work in place. To do so, use the following base snippet for your query:

```php
<?php 
    global $wp_query;
    $custom_args = array(
        'posts_per_page' => 5,
        'offset' => 1
    );
    $args = array_merge($wp_query->query_vars, $custom_args);
    query_posts($args);
?>
<!-- Loop code goes here (if, while, etc.) ... -->
```

This ensures that the original query created by WordPress carries forward and that your custom arguments simply override existing ones, rather than starting from scratch with just your custom arguments.

### Further Customizations

A whole slew of additional features are available to further customize your WordPress theme to fit the needs of the site your editing. 

#### Working with WordPress Menus

In order to get menus from WordPress to show up in our theme we need to register them using a custom function. This involves setting up a "position" in your theme in which a menu can be placed, and then configuring a particular menu from WordPress to appear in that position.

First let's register a position and assign a menu to it.

1. Open `functions.php` in your theme folder.
2. Place the following inside the opening PHP tags:

    ```php
    function register_menus() {
        register_nav_menus(
            array( 'main-nav' => __( 'Main Nav' ) )
        );
    }
    add_action( 'init', 'register_menus' );
    ```

Now we have a position called "main-nav" defined and we've enabled a menu called "Main Nav" to be placed in it by WordPress. Both of these names can be configured to whatever you'd like, but just be prepared to used the position name again in the next process.

Now we need to indicate where in our actual theme this position should reside. 

3. Open the template file in which a menu position should be inserted, such as `header.php`
4. Identify and remove any static navigation markup you have in place such as a `<ul>`. Feel free to leave any helpful containers such as a `<nav>` or other `<div>` you've already used in your stylesheet.
5. In its place add the following:

    ```php
    <?php 
        wp_nav_menu( array( 
            'theme_location' => 'main-nav',
            'container' => false
        )); 
    ?>
    ```
    
Now WordPress will recognize that your theme has a position in which a menu can be placed. So if you use the Appearance > Menus feature from the administration side of WordPress to configure a menu, just assign it to this position  and you should see it appear in your site.

#### Showing Featured Images

A recent addition to the WordPress functionality is the ability to add a featured image to a post. You can enable this feature in your theme as follows:

1. Open `functions.php` and add the following near the bottom:
`add_theme_support( 'post-thumbnails' );`
2. Now in any template page where you're showing posts that you also want a featured image to appear, add the following at the point in the markup where the image should appear:

    ```php
    <?php if ( has_post_thumbnail() ) {
      the_post_thumbnail('large');
    } ?>
    ```

This is set to show the "large" image but you also have the option to show other sizes. Learn more [here](https://developer.wordpress.org/reference/functions/the_post_thumbnail/).

#### A Few Miscellaneous Content Tags

Here are just a few others things you might find helpful:

* `body_class($class)` -- displays all the classes that WordPress has generated for the page as a whole. This is typically placed inside the opening <body> and generates the full class attribute.
* `single_cat_title()` -- displays a single category title for use on pages such as a category template page.
* `bloginfo('__value__')` -- this function contains a series of helpful options that allow you to retrieve and display different information relative to your site. Consider the following options to use for `'__value__'`:
    * `'url'` -- displays the full URL for your site
    * `'name'` -- displays the name of your site as is configured from within WordPress
    * `'template_directory'` -- displays the path to directory for the current page's template from within your theme. This is helpful for providing paths to images and other assets from within such a template file, as was covered in WordPress Tips Part 1. 

More information on this function can be found [here](https://developer.wordpress.org/reference/functions/bloginfo/http://).

#### Working with Custom or Guest Authors

WordPress allows a lot of flexibility including setting up custom fields on any post. A common such customization you might need is the ability to provide a custom or guest author for a post. First set up a custom field using the desired post's Custom Field Widget. Be careful to provide a neat and easy to remember slug for the field such as guest-author. Then add the following code to your theme's functions.php file:

```php
add_filter( 'the_author', 'guest_author_name' );
add_filter( 'get_the_author_display_name', 'guest_author_name' );
function guest_author_name( $name ) {
    global $post;
    $author = get_post_meta( $post->ID, 'guest-author', true );
    if ( $author )
        $name = $author;
    return $name;
}
```

Now any time you call the_author(), if the post has a guest-author custom field provided that name will appear instead of the user who created the post.