"use client";

export default function TransactionCard({
  icon,
  percentage,
  title,
  amount,
  transactions,
}) {
  return (
    <div className="bg-[#121212] rounded-2xl h-[208px] p-5 space-y-3">
      
<div className="flex justify-between">


 <div>
        <p className="text-[var(--color-gray-100)] text-sm font-normal mt-3">
          {title}
        </p>

        <h3 className="text-3xl font-bold text-white mt-4">
          {amount}
        </h3>

       <div className="flex mt-2 bg-[rgba(16,185,129,0.5)]  rounded-lg px-3 py-1 w-max"> 
        <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_756)">
<path d="M5.02974 0.970306C4.73677 0.677338 4.26099 0.677338 3.96802 0.970306L0.218018 4.72031C-0.0749512 5.01328 -0.0749512 5.48906 0.218018 5.78202C0.510986 6.07499 0.986768 6.07499 1.27974 5.78202L3.75005 3.30937V10.5C3.75005 10.9148 4.08521 11.25 4.50005 11.25C4.91489 11.25 5.25005 10.9148 5.25005 10.5V3.30937L7.72036 5.77968C8.01333 6.07265 8.48911 6.07265 8.78208 5.77968C9.07505 5.48671 9.07505 5.01093 8.78208 4.71796L5.03208 0.967963L5.02974 0.970306Z" fill="#10B981"/>
</g>
<defs>
<clipPath id="clip0_1_756">
<path d="M0 0H9V12H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg><p className="text-xs font-normal text-[var(--color-primary)]">
          {amount}
        </p>
        </div>
      </div>

    
<svg width="60" height="53" viewBox="0 0 60 53" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 0C3.36328 0 0 3.36328 0 7.5V45C0 49.1367 3.36328 52.5 7.5 52.5H52.5C56.6367 52.5 60 49.1367 60 45V18.75C60 14.6133 56.6367 11.25 52.5 11.25H9.375C8.34375 11.25 7.5 10.4062 7.5 9.375C7.5 8.34375 8.34375 7.5 9.375 7.5H52.5C54.5742 7.5 56.25 5.82422 56.25 3.75C56.25 1.67578 54.5742 0 52.5 0H7.5ZM48.75 28.125C49.7446 28.125 50.6984 28.5201 51.4016 29.2234C52.1049 29.9266 52.5 30.8804 52.5 31.875C52.5 32.8696 52.1049 33.8234 51.4016 34.5266C50.6984 35.2299 49.7446 35.625 48.75 35.625C47.7554 35.625 46.8016 35.2299 46.0984 34.5266C45.3951 33.8234 45 32.8696 45 31.875C45 30.8804 45.3951 29.9266 46.0984 29.2234C46.8016 28.5201 47.7554 28.125 48.75 28.125Z" fill="white"/>
</svg>



</div>

     

    </div>
  );
}