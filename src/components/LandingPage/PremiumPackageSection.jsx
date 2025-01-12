import React from 'react';

const PremiumPackageSection = () => {
  return (
    <>
        <section className='premium-package-container d-flex align-items-center flex-column' id="pricing">
            <h1 className='color-orange'>Available Premium Packages</h1>
            <div className="premium-box-container d-flex align-items-center justify-content-center flex-wrap gap-5">
            {[
                { title: 'Weekly', price: '¥ 1,100/week', originalPrice: '¥10,000/month' },
                { title: 'Monthly', price: '¥ 4,500/month', originalPrice: '¥10,000/month' },
                { title: 'Yearly', price: '¥ 15,500/month', originalPrice: '¥10,000/month' },
                { title: 'One-time use', price: 'Free', content: 'The free trial gives you access to our services with limited usage.' }
            ].map((pkg, index) => (
                <div className="premium-card d-flex align-items-center justify-content-center" key={index}>
                <div className="premium-card-border d-flex align-items-center flex-column">
                    <div>
                    <p className='premium-card-title'>{pkg.title}</p>
                    <p className='premium-card-price'>{pkg.price}</p>
                    </div>
                    
                    {pkg.originalPrice && <p className='premium-card-below-price'>instead of {pkg.originalPrice}</p>}
                    {pkg.title !== 'One-time use' ? (
                    <>
                        <div>
                        <p className="premium-card-name-price">Early-bird Price</p>
                        <p className="premium-card-content">All Premium features included. Pay as you go, cancel anytime.</p>
                        </div>
                    </>
                    ) : (
                    <div>
                        <p className="premium-card-content">{pkg.content}</p>
                    </div>
                    )}
                    <button className='start-now-btn'>START NOW</button>
                </div>
                </div>
            ))}
            </div>
        </section>

    </>

  );
};

export default PremiumPackageSection;