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
  const [portfolioEvolution, setPortfolioEvolution] = useState<{ date: string, value: number }[]>([]);
  const [valorCarteira, setValorCarteira] = useState(0);
  const [saldoCarteira, setSaldoCarteira] = useState(1000); // Saldo inicial
  const [ganhosCarteira, setGanhosCarteira] = useState(0);
  const [perdasCarteira, setPerdasCarteira] = useState(0);

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const res = await axios.get('http://localhost:8080/valoresPortfolio/findAll');
        const data = res.data;
        setStockDetails(data);
        
        let totalInvestido = 0;
        let totalAtual = 0;
        let ganhos = 0;
        let perdas = 0;

        data.forEach((stock: any) => {
          const valorInvestido = stock.valuePurchased * stock.numberStockPurchased;
          const valorAtual = stock.valueStock * stock.numberStockPurchased;
          totalInvestido += valorInvestido;
          totalAtual += valorAtual;

          if (valorAtual > valorInvestido) {
            ganhos += (valorAtual - valorInvestido);
          } else {
            perdas += (valorInvestido - valorAtual);
          }
        });

        setValorCarteira(totalAtual);
        setGanhosCarteira(ganhos);
        setPerdasCarteira(perdas);

      } catch (error) {
        console.error('Error fetching stock details:', error);
      }
    };

    fetchStockDetails();
  }, []);

  const updateStockDetails = async () => {
    try {
      const res = await axios.get('http://localhost:8080/valoresPortfolio/findAll');
      const data = res.data;
      setStockDetails(data);
      
      let totalInvestido = 0;
      let totalAtual = 0;
      let ganhos = 0;
      let perdas = 0;

      data.forEach((stock: any) => {
        const valorInvestido = stock.valuePurchased * stock.numberStockPurchased;
        const valorAtual = stock.valueStock * stock.numberStockPurchased;
        totalInvestido += valorInvestido;
        totalAtual += valorAtual;

        if (valorAtual > valorInvestido) {
          ganhos += (valorAtual - valorInvestido);
        } else {
          perdas += (valorInvestido - valorAtual);
        }
      });

      setValorCarteira(totalAtual);
      setGanhosCarteira(ganhos);
      setPerdasCarteira(perdas);

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

  const CarregaCarteira = () => {
    updateStockDetails();
  };

  return (
    <div className="container mx-auto">
      <button
        onClick={CarregaCarteira}
        className="mb-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out"
      >
        Carrega Carteira
      </button>

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
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12h3.75A2.25 2.25 0 0 0 9 14.25v5.25m0-7.5v-.75a2.25 2.25 0 0 1 2.25-2.25H15m-6 0h9m0 0A2.25 2.25 0 0 1 20.25 12m-2.25 0v.75a2.25 2.25 0 0 1-2.25 2.25H11.25m0 0v3.75" />
            </svg>
          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-900 dark:text-gray-100 font-bold text-2xl">R$ {valorCarteira}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">Valor da Carteira</p>
          </div>
        </div>
        <div className="bg-white dark:text-white dark:border-strokedark dark:bg-boxdark rounded shadow px-8 py-6 flex items-center">
          <div className="p-4 bg-indigo-700 rounded text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={32} height={32} stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-900 dark:text-gray-100 font-bold text-2xl">R$ {ganhosCarteira}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">Ganho</p>
          </div>
        </div>
        <div className="bg-white dark:text-white dark:border-strokedark dark:bg-boxdark rounded shadow px-8 py-6 flex items-center">
          <div className="p-4 bg-red-600 rounded text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={32} height={32} stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818-.879-.659c-1.171-.879-3.07-.879-4.242 0-1.172.879-1.172 2.303 0 3.182C7.464 17.781 8.232 18 9 18c.725 0 1.45.22 2.003.659 1.106.879 1.106 2.303 0 3.182s-2.9.879-4.006 0l-.415-.33M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z" />
            </svg>
          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-900 dark:text-gray-100 font-bold text-2xl">R$ {perdasCarteira}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">Perdas</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stocks}
      </div>
      <div className="flex flex-col mt-8">
        <PortfolioEvolutionChart
          saldo={saldoCarteira}
          valorCarteira={valorCarteira}
          ganhos={ganhosCarteira}
          perdas={perdasCarteira}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default StocksList;



