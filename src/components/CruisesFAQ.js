import { Card } from 'primereact/card'

export const CruisesFAQ = () => {

  return (
      <main className='card w-full my-5'>
        <Card title={<div className='text-3xl text-700 font-medium text-center'>Ответы на часто задаваемые вопросы</div>}>
          <div className='mb-3'>
            <div className='text-xl font-semibold'>Вопрос 1: Стоимость указана за человека или каюту?</div>
            <div className='text-lg ml-3 mt-1'>Стоимость указана за одного человека в каюте.</div>
          </div>
          <div className='mb-3'>
            <div className='text-xl font-semibold'>Вопрос 2: Что включено в стоимость круиза?</div>
            <div className='text-lg ml-3 mt-1'>В большинстве круизов в стоимость включено: проживание в каюте выбранной категории, трехразовое питание, развлекательная программа и путевая информация на борту. Экскурсионная программа также может быть включена в стоимость, а может оплачиваться дополнительно. 
            </div>
          </div>
          <div className='mb-3'>
            <div className='text-xl font-semibold'>Вопрос 3: Есть ли у вас какие-то скидки и акции?</div>
            <div className='text-lg ml-3 mt-1'>В каждом круизе и теплоходе действуют свои скидочные предложения. Например, бывают специальные предложения для детей, пенсионеров, медицинских работников, работников силовых ведомств, молодожёнов, именинников. С акциями и скидками по конкретному рейсу и теплоходу можно ознакомиться на нашем сайте или уточнить у менеджера. Также при покупке круизов заранее на большинство круизов действуют скидки раннего бронирования, размер скидки зависит от теплохода, оператора и даты покупки круиза.</div>
          </div>
          <div className='mb-3'>
            <div className='text-xl font-semibold'>Вопрос 4: Можно ли путешествовать с питомцами?</div>
            <div className='text-lg ml-3 mt-1'>К сожалению, нет. Домашние животные на борт не допускаются.</div>
          </div>
          <div className='mb-3'>
            <div className='text-xl font-semibold'>Вопрос 5: Есть ли одноместные каюты?</div>
            <div className='text-lg ml-3 mt-1'>Одноместные каюты представлены на многих теплоходах, но бывают исключения. Также вы можете выбрать для себя одноместное размещение в двухместной каюте - оплата второго места в каюте будет за дополнительную плату. Все подробности вы можете уточнить у наших менеджеров.</div>
          </div>
          <div className='mb-3'>
            <div className='text-xl font-semibold'>Вопрос 6: Когда начинается посадка на борт?</div>
            <div className='text-lg ml-3 mt-1'>Обычно посадка начинается за два часа и заканчивается за полчаса до отправления теплохода. Однако бывают исключения, поэтому при оформлении путевки важно также уточнить подробности у менеджера.</div>
          </div>
          <div className='mb-3'>
            <div className='text-xl font-semibold'>Вопрос 7: Возможна ли свободная прогулка не в составе экскурсии?</div>
            <div className='text-lg ml-3 mt-1'>Да, если вы прибыли в город и не хотите участвовать в организованной экскурсионной программе, вы можете прогуляться по городу самостоятельно. Главное, следовать графику и вернуться на борт к указанному в программе времени.</div>
          </div>
        </Card>
      </main>
    )
  }
 