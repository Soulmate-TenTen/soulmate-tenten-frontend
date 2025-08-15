export default function Head() {
  const title = "SOULMATE - 후회를 줄이고 더 나은 선택을 돕는 AI 서비스";
  const description =
    "SOULMATE는 AI와 함께 고민을 분석하고 회고를 기록해 후회 없는 더 나은 결정을 내릴 수 있도록 돕는 서비스입니다. SOULMATE는 언제나 당신의 선택을 지원합니다.";
  const url = "https://soulmate-tenten-frontend.vercel.app";
  const thumbnail = "/thumbnail.png";

  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={description} />
      <meta name="keywords" content="SOULMATE, AI 의사결정, 후회 방지, 후회 예방, 후회, 선택 분석, 회고 다이어리, AI 서비스" />
      <meta name="image" property="og:image" content={thumbnail} />
      <meta name="og:site_name" content={title} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={url} />
      <meta name="og:image" content={thumbnail} />
      <meta name="twitter:site_name" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:type" content="website" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={thumbnail} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </>
  );
}
