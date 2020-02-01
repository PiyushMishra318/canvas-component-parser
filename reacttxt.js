ReactDOM.render( <React.Fragment> 
    <h1 className='charts--headline'>
      Wanna check the code?<br></br>Click "Edit this pen" in left bottom corner.
    </h1>
    <div className='charts--container'>
      <ul>
        <li className='chart'>
          <h3 className='chart--subHeadline'>Chart 1</h3>
          <h2 className='chart--headline'>Pie Question Would Go Here</h2>
          <div id='pieChart'>
            <svg id='pieChartSVG'>
              <defs>
                <filter id='pieChartInsetShadow'>
                  <feoffset dx='0' dy='0'></feoffset>
                  <fegaussianblur stdDeviation='3' result='offset-blur'></fegaussianblur>
                  <fecomposite operator='out' in='SourceGraphic' in2='offset-blur' result='inverse'></fecomposite>
                  <feflood floodColor='black' floodOpacity='1' result='color'></feflood>
                  <fecomposite operator='in' in='color' in2='inverse' result='shadow'></fecomposite>
                  <fecomposite operator='over' in='shadow' in2='SourceGraphic'></fecomposite>
                </filter>
                <filter id='pieChartDropShadow'>
                  <fegaussianblur in='SourceAlpha' stdDeviation='3' result='blur'></fegaussianblur>
                  <feoffset in='blur' dx='0' dy='3' result='offsetBlur'></feoffset>
                  <femerge>
                    <femergenode></femergenode>
                    <femergenode in='SourceGraphic'></femergenode>
                  </femerge>
                </filter>
              </defs>
            </svg>
          </div>
        </li>
        <li className='chart'>
          <h3 className='chart--subHeadline'>Chart 2</h3>
          <h2 className='chart--headline'>Area Label Would Go Here</h2>
          <div id='lineChart'>
            <svg id='lineChartSVG' className='lineChart--svg'>
              <defs>
                <lineargradient id='lineChart--gradientBackgroundArea' x1='0' x2='0' y1='0' y2='1'>
                  <stop className='lineChart--gradientBackgroundArea--top' offset='0%'></stop>
                  <stop className='lineChart--gradientBackgroundArea--bottom' offset='100%'></stop>
                </lineargradient>
              </defs>
            </svg>
          </div>
        </li>
      </ul>
    </div>
 </React.Fragment>,
document.getElementById("app") );
