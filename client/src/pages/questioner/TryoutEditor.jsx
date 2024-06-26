import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Dropdown,
  FileInput,
  Textarea,
  TextInput,
} from 'flowbite-react';
import { fetchQuestioner } from '../../utils/fetchQuestioner';
import { useParams } from 'react-router-dom';

const TryoutEditor = () => {
  const [tryout, setTryout] = useState({
    image: null,
    imageA: null,
    imageB: null,
    imageC: null,
    imageD: null,
    imageE: null,
    imageExlanation: null,
    number: '',
    type: '',
    question: '',
    explanation: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    optionE: '',
    scoreA: 0,
    scoreB: 0,
    scoreC: 0,
    scoreD: 0,
    scoreE: 0,
  });
  const fileInputRef = useRef(null);

  const [numbers, setNumbers] = useState([1]);
  const [activeNumber, setActiveNumber] = useState(1);
  const [isSave, setIsSave] = useState(false);

  const { id } = useParams();

  const handleType = (newType) => () => {
    setTryout((prevState) => ({
      ...prevState,
      type: newType,
    }));
  };

  useEffect(() => {
    const setType = () => {
      if (activeNumber <= 30) {
        setTryout((prev) => ({ ...prev, type: 'tiu' }));
      }
    };
    setType();
  }, [activeNumber]);

  useEffect(() => {
    const fetchSoal = async () => {
      try {
        const response = await fetchQuestioner.get(
          `/tryout/${id}/${activeNumber}`
        );
        const { soal, totalSoal } = response.data;

        const getNumbers = () => {
          const result = [];
          for (let i = 1; i <= totalSoal; i++) {
            result.push(i);
          }
          return result;
        };

        setNumbers(getNumbers());
        setTryout({
          number: soal.number,
          type: soal.type,
          question: soal.question,
          explanation: soal.explanation,
          optionA: soal.optionA,
          optionB: soal.optionB,
          optionC: soal.optionC,
          optionD: soal.optionD,
          optionE: soal.optionE,
          scoreA: soal.scoreA,
          scoreB: soal.scoreB,
          scoreC: soal.scoreC,
          scoreD: soal.scoreD,
          scoreE: soal.scoreE,
        });
      } catch (error) {
        console.error('Error fetching soal:', error);
      }
    };

    fetchSoal();
  }, [id, activeNumber]);

  useEffect(() => {
    const originalTryout = {
      type: '',
      question: '',
      explanation: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      optionE: '',
      scoreA: 0,
      scoreB: 0,
      scoreC: 0,
      scoreD: 0,
      scoreE: 0,
    };

    const hasChanged = Object.keys(originalTryout).some(
      (key) => tryout[key] !== originalTryout[key]
    );

    setIsSave(hasChanged);
  }, [tryout]);

  useEffect(() => {
    setTryout((prevState) => ({
      ...prevState,
      number: activeNumber,
    }));
  }, [activeNumber]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTryout((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleClear = () => {
    setTryout({
      number: '',
      type: '',
      question: '',
      explanation: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      optionE: '',
      scoreA: 0,
      scoreB: 0,
      scoreC: 0,
      scoreD: 0,
      scoreE: 0,
    });
  };

  const createSoal = async () => {
    const response = await fetchQuestioner.post(
      `/tryout-editor/${id}`,
      {
        number: tryout.number,
        question: tryout.question,
        scoreA: tryout.scoreA,
        scoreB: tryout.scoreB,
        scoreC: tryout.scoreC,
        scoreD: tryout.scoreD,
        scoreE: tryout.scoreE,
        explanation: tryout.explanation,
        optionA: tryout.optionA,
        optionB: tryout.optionB,
        optionC: tryout.optionC,
        optionD: tryout.optionD,
        optionE: tryout.optionE,
        type: tryout.type,
        image: tryout.image,
        imageA: tryout.imageA,
        imageB: tryout.imageB,
        imageC: tryout.imageC,
        imageD: tryout.imageD,
        imageE: tryout.imageE,
        imageExlanation: tryout.imageExlanation,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('success', response);
  };
  const handleFile = (e) => {
    const { id } = e.target;
    const file = e.target.files[0];
    setTryout((prevForm) => ({
      ...prevForm,
      [id]: file,
    }));
  };

  const handleSave = () => {
    createSoal();
  };

  const clearFileInput = () => {
    console.log(fileInputRef);
  };

  const handleSaveAndNext = () => {
    handleSave();
    setActiveNumber((prev) => {
      const newNumber = prev + 1;
      setNumbers([...numbers, newNumber]);
      return newNumber;
    });
    handleClear();
    clearFileInput();
  };

  return (
    <div className='flex'>
      <div className='w-1/5 bg-white border-r border-gray-300'>
        <div className='fixed top-0 left-0 right-0 bg-white z-10'>
          <header className='flex justify-between border-b border-black h-20'>
            <h1 className='text-2xl m-2 md:m-6 font-medium'>Tryout Editor</h1>
          </header>
        </div>
        <div className='flex flex-col mt-20'>
          <div className='w-full navigation overflow-auto flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-y-4 p-4'>
            {numbers.map((number) => (
              <button
                key={number}
                className={`text-center border border-black cursor-pointer py-2 flex-shrink-0 w-10 h-10 mr-2 ${
                  activeNumber === number ? 'bg-gray-600 text-white' : ''
                }`}
                onClick={() => setActiveNumber(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='w-4/5 py-24 px-8'>
        <h1 className='text-xl font-medium my-4'>Soal Nomer {activeNumber}</h1>
        <form className='flex max-w-md flex-col gap-4'>
          <div>
            <Dropdown
              label={tryout.type ? tryout.type : 'Tipe Soal'}
              color={'success'}
              dismissOnClick={true}
            >
              <Dropdown.Item onClick={handleType('tiu')}>TIU</Dropdown.Item>
              <Dropdown.Item onClick={handleType('twk')}>TWK</Dropdown.Item>
              <Dropdown.Item onClick={handleType('tkp')}>TKP</Dropdown.Item>
            </Dropdown>
          </div>
          <div>
            <Textarea
              id='question'
              placeholder='Soal...'
              rows={4}
              value={tryout.question}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <FileInput ref={fileInputRef} id='image' onChange={handleFile} />
          </div>
          <div>
            <ul className='space-y-2'>
              <li className='flex space-x-2'>
                <TextInput
                  className='w-4/5'
                  id='optionA'
                  placeholder='Opsi Jawaban'
                  addon='A'
                  required
                  value={tryout.optionA}
                  onChange={handleInputChange}
                />
                <FileInput
                  ref={fileInputRef}
                  id='imageA'
                  onChange={handleFile}
                />
                <TextInput
                  className='w-1/5'
                  id='scoreA'
                  type='number'
                  placeholder='Value'
                  required
                  value={tryout.scoreA}
                  onChange={handleInputChange}
                  shadow
                />
              </li>
              <li className='flex space-x-2'>
                <TextInput
                  id='optionB'
                  className='w-4/5'
                  placeholder='Opsi Jawaban'
                  addon='B'
                  required
                  value={tryout.optionB}
                  onChange={handleInputChange}
                />
                <FileInput
                  ref={fileInputRef}
                  id='imageB'
                  onChange={handleFile}
                />
                <TextInput
                  className='w-1/5'
                  id='scoreB'
                  type='number'
                  placeholder='Value'
                  required
                  value={tryout.scoreB}
                  onChange={handleInputChange}
                  shadow
                />
              </li>
              <li className='flex space-x-2'>
                <TextInput
                  id='optionC'
                  className='w-4/5'
                  placeholder='Opsi Jawaban'
                  addon='C'
                  required
                  value={tryout.optionC}
                  onChange={handleInputChange}
                />
                <FileInput
                  ref={fileInputRef}
                  id='imageC'
                  onChange={handleFile}
                />
                <TextInput
                  className='w-1/5'
                  id='scoreC'
                  type='number'
                  placeholder='Value'
                  required
                  value={tryout.scoreC}
                  onChange={handleInputChange}
                  shadow
                />
              </li>
              <li className='flex space-x-2'>
                <TextInput
                  id='optionD'
                  className='w-4/5'
                  placeholder='Opsi Jawaban'
                  addon='D'
                  required
                  value={tryout.optionD}
                  onChange={handleInputChange}
                />
                <FileInput
                  ref={fileInputRef}
                  id='imageD'
                  onChange={handleFile}
                />
                <TextInput
                  className='w-1/5'
                  id='scoreD'
                  type='number'
                  placeholder='Value'
                  required
                  value={tryout.scoreD}
                  onChange={handleInputChange}
                  shadow
                />
              </li>
              <li className='flex space-x-2'>
                <TextInput
                  id='optionE'
                  className='w-4/5'
                  placeholder='Opsi Jawaban'
                  addon='E'
                  required
                  value={tryout.optionE}
                  onChange={handleInputChange}
                />
                <FileInput
                  ref={fileInputRef}
                  id='imageE'
                  onChange={handleFile}
                />
                <TextInput
                  className='w-1/5'
                  id='scoreE'
                  type='number'
                  placeholder='Value'
                  required
                  value={tryout.scoreE}
                  onChange={handleInputChange}
                  shadow
                />
              </li>
            </ul>
          </div>
          <div>
            <Textarea
              id='explanation'
              placeholder='Penjelasan...'
              required
              rows={4}
              value={tryout.explanation}
              onChange={handleInputChange}
            />
            <FileInput
              ref={fileInputRef}
              id='imageExlanation'
              onChange={handleFile}
            />
          </div>
          <div className='flex space-x-2'>
            <Button color={'failure'} size='sm' onClick={handleClear}>
              Clear
            </Button>
            <Button
              disabled={!isSave}
              color={'success'}
              size='sm'
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              disabled={!isSave}
              color={'success'}
              size='sm'
              onClick={handleSaveAndNext}
            >
              Save and Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TryoutEditor;
