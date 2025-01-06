import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ClockCountdown, UsersThree } from "@phosphor-icons/react";
import axios from 'axios';

function Recipage() {
    const { id } = useParams();
    const location = useLocation();
    const { recipe: initialRecipe } = location.state || {};
    const [recipe, setRecipe] = useState(initialRecipe);
    const [loading, setLoading] = useState(!initialRecipe);

    useEffect(() => {
        const fetchRecipe = async (id) => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/recipe/${id}`);
                const data = response.data;
                setRecipe(data.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
            setLoading(false);
        };

        if (!initialRecipe && id) {
            fetchRecipe(id);
        }
    }, [id, initialRecipe]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full w-full">
                <div className="loading bg-secondaryLight px-2 py-2">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        );
    }

    if (!recipe) {
        return <p>Recipe not found.</p>;
    }

    return (
        <div className='h-full w-full p-8'>
            <div className='w-full h-full'>
                <div className='flex flex-col items-center'>
                    <div>
                        <h2 className='text-3xl font-bold mb-4 text-right'>{recipe.name}</h2>
                    </div>
                    {recipe.img && (
                        <div>
                            <img
                                src={`http://localhost:8000/storage/${recipe.img}`}
                                alt="Recipe"
                                className='w-full rounded-lg shadow-lg'
                            />
                        </div>
                    )}

                    {/* Recipe Info: Serving and Time */}
                    <div className='flex lg:flex-row flex-col my-20 gap-4 mb-4 w-full'>
                        <div className='flex flex-col lg:flex-row justify-center gap-2 items-center bg-gray-100 w-full'>
                            <p className='text-sm'>عدد الأفراد</p>
                            <p className='w-12 h-12 rounded-md  flex justify-center items-center text-lg font-bold'>
                                {recipe.serving} <UsersThree size={20} weight="fill" />
                            </p>
                        </div>
                        <div className='flex lg:flex-row flex-col items-center justify-center bg-gray-100 w-full'>
                            <p className='text-sm'>وقت التحضير</p>
                            <p className='w-12 h-12 rounded-md flex justify-center items-center text-lg font-bold'>
                                {recipe.timeInMinutes} <ClockCountdown size={20} weight="fill" />
                            </p>
                        </div>
                    </div>

                    {/* Ingredients and Instructions */}
                    <div dir='rtl' className='mt-4 grid lg:grid-cols-2 grid-cols-1 gap-4'>
                        <div>
                            <p className='text-lg mb-4'>المكونات:</p>
                            <ul className='list-disc list-inside'>
                                {/* Example Ingredients (replace with actual data from recipe) */}
                                <li>2 أكواب من الدقيق الأبيض</li>
                                <li>1 ملعقة صغيرة من مسحوق الخبز</li>
                                <li>رشة ملح</li>
                                <li>1 كوب من السكر</li>
                                <li>1/2 كوب من الزبدة المذابة</li>
                                <li>2 بيض كبير</li>
                                <li>1 كوب من رقائق الشوكولاتة</li>
                            </ul>
                        </div>

                        <div className='flex flex-col'>
                            <div dir='rtl' className='bg-lime-200 p-6 rounded-lg'>
                                <h3 className='text-2xl font-bold mb-4'>طريقة التحضير</h3>
                                <ul className='list-decimal list-inside'>
                                    {/* Example Instructions (replace with actual data from recipe) */}
                                    <li>سخّن الفرن إلى 180°C (350°F) وادهن صينية الخبز بالزبدة أو رذاذ غير لاصق.</li>
                                    <li>في وعاء خلط كبير، امزج 2 كوب من الدقيق، 1 ملعقة صغيرة من مسحوق الخبز، ورشة ملح. اتركه جانباً.</li>
                                    <li>في وعاء آخر، اخفق 1 كوب من السكر، 1/2 كوب من الزبدة المذابة، و2 بيض كبير حتى يصبح الخليط ناعماً.</li>
                                    <li>أضف المكونات الجافة تدريجياً إلى المكونات الرطبة، مع خلط جيد بعد كل إضافة.</li>
                                    <li>امزج 1 كوب من رقائق الشوكولاتة (أو أي إضافات مثل المكسرات أو الفواكه المجففة) حتى تتوزع بالتساوي.</li>
                                    <li>خذ ملاعق من العجين وضعها على صينية الخبز المعدة، مع ترك مسافة بين كل قطعة من البسكويت.</li>
                                    <li>اخبز في الفرن المسخن مسبقاً لمدة 12-15 دقيقة أو حتى تصبح الأطراف ذهبية اللون.</li>
                                    <li>أخرج البسكويت من الفرن واتركه يبرد على صينية الخبز لمدة 5 دقائق قبل نقله إلى رف سلكي.</li>
                                    <li>استمتع بالبسكويت المنزلي مع كوب من الحليب أو مشروبك المفضل!</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Section */}
                    {/* <div className='bg-red-900'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div>
                                {recipe.product?.img && (
                                    <div>
                                        <img
                                            src={recipe.product.img}
                                            alt="Product"
                                            className='w-full rounded-lg shadow-lg'
                                        />
                                    </div>
                                )}
                                <h2 className='text-3xl font-bold mb-4'>{recipe.product?.name}</h2>
                                <p>{recipe.product?.description}</p>
                                <p>Price: {recipe.product?.price}</p>
                                <p>Stock: {recipe.product?.stock}</p>
                            </div>
                        </div>
                    </div> */}


                </div>
            </div>
        </div>
    );
}

export default Recipage;
