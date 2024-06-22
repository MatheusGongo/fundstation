/* import React from "react";
import Image from "next/image";
import Link from 'next/link';
import { mockData } from '@/app/constants/mockBD';
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import StockChartPerformance from "@/components/Charts/StockChartPerformance"

interface StockPortfolioProps {
  nameStock: string;
  symbolStock: string;
  valueToday: number;
  rate: number;
  levelUp?: boolean;
  levelDown?: boolean;
  logoStock: string;
  valuePurchased: number;
  valueStock: number;
}

const formatCurrency = (value = 0) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const simplifiedPercent = (value = 0) => {
  return value.toFixed(2);
}

const StockPortfolio: React.FC<StockPortfolioProps> = ({
  nameStock,
  symbolStock,
  valueToday,
  rate,
  levelUp,
  levelDown,
  logoStock,
  valuePurchased,
  valueStock,
}) => {
  return (
    <Link href={`/stock/${symbolStock}`}>
      <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-center">
          <Image src={logoStock} alt="" width={40} height={40} className="rounded" />
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {symbolStock}
          </h4>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-sm font-medium dark:text-white">Preço (agora)</span>
          </div>
          <span className="flex items-center gap-1 text-sm font-bold dark:text-white">
            {formatCurrency(valueToday)}
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-sm font-medium dark:text-white">Variação (agora)</span>
          </div>
          <span
            className={`flex items-center gap-1 text-sm font-medium ${levelUp && "text-meta-3"} ${levelDown && "text-meta-1"}`}
          >
            {simplifiedPercent(rate)}
            {levelUp && (
              <ArrowUpIcon className="fill-meta-3" width={11} height={11} />
            )}
            {levelDown && (
              <ArrowDownIcon className="fill-meta-1" width={11} height={11} />
            )}
          </span>
        </div>
        <StockChartPerformance symbol={symbolStock} valuePurchased={valuePurchased} valueStock={valueStock} />
      </div>
    </Link>
  );
};

const StocksList = () => {
  const stocks = mockData.map((stock: any) => {
    const isUp = stock.value_stock > stock.value_purchased;
    const isDown = stock.value_stock < stock.value_purchased;
    const rate = ((stock.value_stock - stock.value_purchased) / stock.value_purchased) * 100;
    const logoStock = `/images/logos/${stock.symbol}.png`; // Mocked path for the stock logos

    return (
      <StockPortfolio
        key={stock.id}
        nameStock={stock.symbol}
        symbolStock={stock.symbol}
        valueToday={stock.value_stock}
        rate={rate}
        levelUp={isUp}
        levelDown={isDown}
        logoStock={logoStock}
        valuePurchased={stock.value_purchased}
        valueStock={stock.value_stock}
      />
    );
  });

  return <div className="grid grid-cols-1 gap-4">{stocks}</div>;
};

export default StocksList; */



import React, { useState, useEffect } from "react";
import axios from 'axios';
import StockChartPerformance from "@/components/Charts/StockChartPerformance";
import PortfolioEvolutionChart from '@/components/Charts/PortfolioEvolutionChart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface StockPortfolioProps {
  nameStock: string;
  symbolStock: string;
  valueToday: number;
  rate: number;
  levelUp?: boolean;
  levelDown?: boolean;
  valuePurchased?: number;
  valueStock?: number;
  numberStockPurchased?: number;
}

const formatCurrency = (value = 0) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const generateFakePortfolioEvolution1 = () => {
  const fakeData = [];
  let currentValue = 0;
    const date = new Date();
    date.setDate(date.getDate());
    fakeData.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(currentValue.toFixed(2)),
    });

  console.log(fakeData)

  return fakeData;
};


const generateFakePortfolioEvolution2 = () => {
  const fakeData = [];
  let currentValue = 0;
  const date = new Date();
  date.setDate(date.getDate());

  fakeData.push({
    date: date.toISOString().split('T')[0],
    value: parseFloat(currentValue.toFixed(2)),
  });


  currentValue = 1000;
  fakeData.push({
    date: date.toISOString().split('T')[0],
    value: parseFloat(currentValue.toFixed(2)),
  });

  console.log(fakeData)

  return fakeData;
};




const generateFakePortfolioEvolution22 = () => {
  const fakeData = [];
  let currentValue = 0;
  const date = new Date();
  date.setDate(date.getDate());

  fakeData.push({
    date: date.toISOString().split('T')[0],
    value: parseFloat(currentValue.toFixed(2)),
  });


  currentValue = 1000;
  fakeData.push({
    date: date.toISOString().split('T')[0],
    value: parseFloat(currentValue.toFixed(2)),
  });


  currentValue = 1009.7336;
  date.setDate(date.getDate() + 2);
  fakeData.push({
    date: date.toISOString().split('T')[0],
    value: parseFloat(currentValue.toFixed(2)),
  });

  console.log(fakeData)

  return fakeData;
};

const simplifiedPercent = (value = 0) => {
  return value.toFixed(2);
}

const StockPortfolio: React.FC<StockPortfolioProps> = ({
  nameStock,
  symbolStock,
  valueToday,
  rate,
  levelUp,
  levelDown,
  valuePurchased,
  valueStock,
  numberStockPurchased,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="w-62 rounded-lg border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark transition-all duration-300 ease-in-out transform hover:scale-105">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{symbolStock}</h4>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <span className="text-sm font-medium text-gray-500 dark:text-white">Preço (agora)</span>
          <span className="block text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(valueToday)}</span>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500 dark:text-white">Valor Investido</span>
          <span className="block text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(valuePurchased)}</span>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-500 dark:text-white">Quantidade Comprada</span>
          <span className="block text-lg font-bold text-gray-900 dark:text-white">{numberStockPurchased}</span>
        </div>
      </div>
      <button
        onClick={toggleCollapse}
        className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out"
      >
        {isCollapsed ? "Mostrar Gráfico" : "Esconder Gráfico"}
      </button>
      {!isCollapsed && (
        <div className="mt-6">
          <StockChartPerformance symbol={symbolStock} valuePurchased={valuePurchased || 0.0} valueStock={valueStock || 0.0} />
        </div>
      )}
    </div>
  );
};

const StocksList = () => {
  const [stockDetails, setStockDetails] = useState<any[]>([]);
  //const [portfolioEvolution, setPortfolioEvolution] = useState<{ date: string, value: number }[]>([]);
  const [portfolioEvolution, setPortfolioEvolution] = useState(generateFakePortfolioEvolution1());

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        // const res = await axios.get('http://localhost:8080/portfolio');
        // setStockDetails(res.data);
      } catch (error) {
        console.error('Error fetching stock details:', error);
      }
    };

    const fetchPortfolioEvolution = async () => {
      try {
        const res = await axios.get('http://localhost:8080/portfolio/evolution');
        setPortfolioEvolution(res.data);
      } catch (error) {
        console.error('Error fetching portfolio evolution:', error);
      }
    };

    fetchStockDetails();
    fetchPortfolioEvolution();
  }, []);

  const updateStockDetails1 = async () => {
    try {
      const res = await axios.get('http://localhost:8080/portfolio/carregar');
      setStockDetails(res.data);
      toast.success("As ações foram carregadas!");
    } catch (error) {
      console.error('Error updating stock details:', error);
      toast.error("Erro ao carregar as ações.");
    }
  };

  const stocks = stockDetails.map((stock: any) => {
    const isUp = stock.valueStock > stock.valuePurchased;
    const isDown = stock.valueStock < stock.valuePurchased;
    const rate = ((stock.valueStock - stock.valuePurchased) / stock.valuePurchased) * 100;

    return (
      <StockPortfolio
        key={stock.symbolAction}
        nameStock={stock.symbolAction}
        symbolStock={stock.symbolAction}
        valueToday={stock.valueStock}
        rate={rate}
        levelUp={isUp}
        levelDown={isDown}
        valuePurchased={stock.valuePurchased}
        valueStock={stock.valueStock}
        numberStockPurchased={stock.numberStockPurchased}
      />
    );
  });

  const [valorCarteira, setValorCarteira] = useState(0);
  const [saldoCarteira, setSaldoCarteira] = useState(1000);
  const [ganhosCarteira, setGanhosCarteira] = useState(0);
  const updateValuePortfolio1 = async () => {
    const novoValorCarteira = 1000;
    setValorCarteira(novoValorCarteira);
    setGanhosCarteira(0);


    const novoSaldoCarteira = 0;
    setSaldoCarteira(novoSaldoCarteira);

    setPortfolioEvolution(generateFakePortfolioEvolution2());

  };

  const CarregaCarteira = () => {
    updateStockDetails1();
    updateValuePortfolio1();
  };









  const updateStockDetails2 = async () => {
    try {
      const res = await axios.get('http://localhost:8080/portfolio/atualizar');
      setStockDetails(res.data);
      toast.success("As ações foram atualizadas!");
    } catch (error) {
      console.error('Error updating stock details:', error);
      toast.error("Erro ao atualizar as ações.");
    }
  };

  const AtualizaCarteira = () => {
    updateValuePortfolio2();
    updateStockDetails2();
  };

  const updateValuePortfolio2 = async () => {
    const novoValorCarteira = 1009.7336;
    setValorCarteira(novoValorCarteira);


    const novoSaldoCarteira = 0;
    setSaldoCarteira(novoSaldoCarteira);

    setGanhosCarteira(9.7336);

    setPortfolioEvolution(generateFakePortfolioEvolution22());

  };








  const LimpaCarteira = () => {
    updateValuePortfolio3();
  };

  const updateValuePortfolio3 = async () => {
    setValorCarteira(0);

    setSaldoCarteira(1000);

    setGanhosCarteira(0);

    setPortfolioEvolution(generateFakePortfolioEvolution1());

    setStockDetails([]);

  };



  return (
    <div className="container mx-auto">
      <button
        onClick={CarregaCarteira}
        className="mb-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out"
      >
        Carrega Carteira
      </button>

      <button
        onClick={AtualizaCarteira}
        className=" ml-2 mb-6 px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out"
      >
        Atualiza Carteira
      </button>

      <button
        onClick={LimpaCarteira}
        className=" ml-20 mb-6 px-6 py-2 bg-indigo-300 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-300"
      >
        Limpa Carteira
      </button>

      {/* <button 
        onClick={updateStockDetails} 
        className="mb-6 px-6 py-2 bg-blue-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out"
      >
        Histórico
      </button> */}

      <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div className="bg-white  dark:text-white dark:border-strokedark dark:bg-boxdark rounded shadow px-8 py-6 flex items-center">
          <div className="p-4 bg-indigo-700 rounded text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={32} height={32} stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-900 dark:text-gray-100 font-bold text-2xl">R$ {saldoCarteira}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">Saldo</p>
          </div>
        </div>
        <div className="bg-white dark:text-white dark:border-strokedark dark:bg-boxdark rounded shadow px-8 py-6 flex items-center">
          <div className="p-4 bg-indigo-700 rounded text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={32} height={32} stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
            </svg>
          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-900 dark:text-gray-100 font-bold text-2xl">R$ {valorCarteira}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">Valor da Carteira</p>
          </div>
        </div>
        <div className="bg-white dark:text-white dark:border-strokedark dark:bg-boxdark rounded shadow px-8 py-6 flex items-center">
          <div className="p-4 bg-indigo-700 rounded text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" width={32} height={32} stroke="currentColor" >
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>

          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-900 dark:text-gray-100 font-bold text-2xl">R${ganhosCarteira}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">Ganhos</p>
          </div>
        </div>
        <div className="bg-white dark:text-white dark:border-strokedark dark:bg-boxdark rounded shadow px-8 py-6 flex items-center">
          <div className="p-4 bg-indigo-700 rounded text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={32} height={32} stroke-width="1.5" stroke="currentColor" >
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
            </svg>

          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-900 dark:text-gray-100 font-bold text-2xl">R${0}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">Perdas</p>
          </div>
        </div>
      </div>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-6 mt-10">
        {stocks}
      </div>


      <div className="bg-white dark:text-white dark:border-strokedark dark:bg-boxdark rounded shadow px-8 py-6">
          {/* <PortfolioEvolutionChart data={portfolioEvolution} /> */}
          <PortfolioEvolutionChart data={portfolioEvolution} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default StocksList;


