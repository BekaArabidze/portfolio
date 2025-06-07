import Head from "next/head";

type HeadAndMetaTypes = {
    title: string,
    description: string,
    favIconImagePath: string,
    baseUrl: string,
    ogTitle: string,
    ogDescription: string,
    ogImagePath: string,
    titleBarColor?: string
}

const HeadAndMeta = ({
    title,
    description,
    favIconImagePath,
    baseUrl,
    ogTitle,
    ogDescription,
    ogImagePath,
    titleBarColor
}: HeadAndMetaTypes) => {
    return (
        <>

            <Head>
                <title>{title}</title>
                <link rel="shortcut icon" href={favIconImagePath} />

                <meta name="theme-color" content={titleBarColor} />
                <meta name="msapplication-navbutton-color" content={titleBarColor} />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            </Head>
            <Head>
                <meta name="title" content={title} />
                <meta name="description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={baseUrl} />
                <meta property="og:title" content={ogTitle} />
                <meta property="og:description" content={ogDescription} />
                <meta property="og:image" content={ogImagePath} />


                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={baseUrl} />
                <meta property="twitter:title" content={ogTitle} />
                <meta property="twitter:description" content={ogDescription} />
                <meta property="twitter:image" content={ogImagePath} />



                {/* 12.3.1 */}


                <link rel="shortcut icon" href="#" />
                <meta name="viewport" content="height=device-height, 
                width=device-width, initial-scale=1.0, 
                minimum-scale=1.0, maximum-scale=1.0, 
                user-scalable=no, [maximum-scale]=4.0">
                </meta>

            </Head>

        </>
    )
}

export default HeadAndMeta;