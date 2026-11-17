/**
 * Advertisement.tsx — bosh sahifadagi reklama videosi.
 * Video public/video/burak-ads.mp4 dan olinadi (public papkadagi fayllar URL'dan to'g'ridan-to'g'ri ochiladi).
 * autoPlay + muted + loop + playsInline — brauzerlar ovozli videoni avtomatik o'ynatmaydi,
 * shuning uchun "muted" shart; playsInline — iPhone'da to'liq ekranga o'tib ketmasligi uchun.
 */
import React from "react";
export default function Advertisement() {
  return (
    <div className="ads-restaurant-frame">
      <video
        className={"ads-video"}
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
      >
        <source type="video/mp4" src="video/burak-ads.mp4" />
      </video>
    </div>
  );
}
