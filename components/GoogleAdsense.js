export default function GoogleAdsense({ adslot, type, responsive }) {
    function adunit(adunit, type, classvalues) {
        return (
            <div className={classvalues}>
                <ins className="adsbygoogle"
                    style={{display: 'block'}}
                    data-ad-client="ca-pub-8988173996455041"
                    data-ad-slot={`${adunit}`}
                    data-ad-format={type === "duplex" ? "autorelaxed" : "auto"}
                    data-full-width-responsive={type === "duplex" ? "false" : "true"}
                >
                </ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});    
                </script>
            </div>
        )
    }

    if (responsive === "yes") {
        const adslots = adslot.split(",")
        return (
            <div>
                {adunit(adslots[0], type, "hidden sm:block")}
                {adunit(adslots[1], type, "block sm:hidden")}
            </div>
        )
    } else {
        return adunit(adslot, type, "")
    }
}