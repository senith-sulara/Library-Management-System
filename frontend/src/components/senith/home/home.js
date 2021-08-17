import React from 'react';
import './home.css';

import book from '../images/book.png'
import borrow from '../images/borrow.png'
import member from '../images/member.png'
import report from '../images/report.png'
import res from '../images/res.png'
import staff from '../images/staff.png'



export default function Home() {
    return (
      <div>
      <div className="row1">
      <div className="column1">
              <div className="card">
  <a href="/member">
  <img src={member} alt="John" style={{ width: '200px', height: '200px'}}/>
  <button id="btnH">Member Management</button></a>
</div>
</div>     
{/*----------------- */}
    <div className="column1">
    <div className="card">
    <a href="/borrow">
  <img src={borrow} alt="John" style={{ width: '200px', height: '200px'}}/>
  <button id="btnH">Borrow Management</button></a>
</div>
    </div>

{/*----------------- */}
    <div className="column1">
    <div className="card">
    <a href="/book">
  <img src={book} alt="John" style={{ width: '200px', height: '200px'}}/>
  <button id="btnH">Book Management</button></a>
</div>
    </div>

{/*----------------- */}
<div className="column1">
    <div className="card">
    <a href="/staff">
  <img src={staff} alt="John" style={{ width: '200px', height: '200px'}}/>
  <button id="btnH">Staff Management</button></a>
</div>
    </div>

{/*----------------- */}
    <div className="column1">
    <div className="card">
    <a href="/reports">
  <img src={report} alt="John" style={{ width: '200px', height: '200px'}}/>
  <button id="btnH">Report</button></a>
</div>
    </div>

{/*----------------- */}
<div className="column1">
    <div className="card">
    <a href="/res">
  <img src={res} alt="John" style={{ width: '200px', height: '200px'}}/>
  <button id="btnH">Reservation Management</button></a>
</div>
    </div>

</div>
      </div> 
    );
  }
  
  