'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, Tooltip, YAxis } from "recharts";
import { Widget } from '../widget';
import style from './Admin.module.css';
import { IoReload } from 'react-icons/io5';
import { fetchWidget } from './Admin.service';
import { ObjectWidget } from './Admin.model';


const Admin = () => {
  const [isClient, setIsClient] = useState(false);
  const [widget, setWidget] = useState<ObjectWidget>();

  useEffect(() => {
    setIsClient(true);
    handleWidget();
  }, []);


  const handleWidget = async () => {
    const Widget = await fetchWidget(1);

    console.log('Widget data:', Widget);
    setWidget(Widget);
  };

  return (
    <div className={style.Admin}>
      <div className={style.Admin_Encabezado}>
        <div>
          <h1>¡Hola, <span>¡Bienvenid@!</span></h1>
        </div>
        <IoReload
          className={style.Admin_Encabezado_Icono}
          onClick={handleWidget}

        />
      </div>

      {isClient && (
        <>
          <div className={style.Admin_Widget}>
            <div className={style.Admin_Widget_Left}>
              <Widget widgetData={widget?.total} />
            </div>
            <div className={style.Admin_Widget_Right}>
              <h2>Ventas mes a mes</h2>

              <AreaChart
                width={650}
                height={100}
                data={widget?.ventas ?? []}
                margin={{ top: 20, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" tick={{ fill: "#C4DAD2", fontFamily: "Barlow Condensed" }} />
                <YAxis tick={{ fill: "#C4DAD2", fontFamily: "Barlow Condensed" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#333',
                    borderRadius: '5px',
                    padding: '10px',
                    fontFamily: 'Barlow Condensed',
                    color: 'white',
                  }}
                  labelStyle={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                  itemStyle={{
                    color: '#C4DAD2',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#282641"
                  fill="#8884d8"
                />
              </AreaChart>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
