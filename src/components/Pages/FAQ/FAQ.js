import React from 'react';

const FAQ = () => {
    return (
			<div>
				<div
					tabIndex={0}
					className='collapse collapse-plus border border-base-300 bg-base-100 rounded-box'
				>
					<div className='collapse-title text-xl font-medium'>
						What are the different ways to manage a state in a React
						application?
					</div>
					<div className='collapse-content'>
						<p>
							Are you facing difficulties in making loading spinners or a pop-up
							appears at the right time? It can be because of an unmanaged state
							in React. A state is a JavaScript object. It stores a component’s
							dynamic data and determines the component’s behavior. In other
							words, it is the interface between any data of changes (backend or
							local) and the representation of this data with UI elements in the
							frontend. The state helps in keeping the data of different
							components in sync since each state update will re-render all
							relevant components. It can also act as a medium to communicate
							between various components. Managing state is one of the hardest
							parts of any application, and that is why there are so many state
							management libraries/tools available, including Redux, MobX, Flux,
							RxJS, and more.
						</p>
					</div>
				</div>

				<div
					tabIndex={0}
					className='collapse collapse-plus border border-base-300 bg-base-100 rounded-box'
				>
					<div className='collapse-title text-xl font-medium'>
						How does prototypical inheritance work?
					</div>
					<div className='collapse-content'>
						<p className='text-justify'>
							JavaScript is a bit confusing for developers experienced in
							class-based languages (like Java or C++), as it is dynamic and
							does not have static types. When it comes to inheritance,
							JavaScript only has one construct: objects. Each object has a
							private property which holds a link to another object called its
							prototype. That prototype object has a prototype of its own, and
							so on until an object is reached with null as its prototype. By
							definition, null has no prototype, and acts as the final link in
							this prototype chain. It is possible to mutate any member of the
							prototype chain or even swap out the prototype at runtime, so
							concepts like static dispatching do not exist in JavaScript.
						</p>
					</div>
				</div>

				<div
					tabIndex={0}
					className='collapse collapse-plus border border-base-300 bg-base-100 rounded-box'
				>
					<div className='collapse-title text-xl font-medium'>
						What is a unit test? Why should we write unit tests?
					</div>
					<div className='collapse-content'>
						<p className='text-justify'>
							A unit test is a way of testing a unit - the smallest piece of
							code that can be logically isolated in a system. In most
							programming languages, that is a function, a subroutine, a method
							or property. The isolated part of the definition is important. In
							his book "Working Effectively with Legacy Code", author Michael
							Feathers states that such tests are not unit tests when they rely
							on external systems: “If it talks to the database, it talks across
							the network, it touches the file system, it requires system
							configuration, or it can't be run at the same time as any other
							test."
						</p>
						<br />
						<span className='text-xl underline font-bold'>
							How unit tests work :
						</span>
						<p className='text-justify'>
							A unit test typically comprises of three stages: plan, cases and
							scripting and the unit test itself. In the first step, the unit
							test is prepared and reviewed. The next step is for the test cases
							and scripts to be made, then the code is tested. Test-driven
							development requires that developers first write failing unit
							tests. Then they write code and refactor the application until the
							test passes. TDD typically results in an explicit and predictable
							code base.
						</p>
					</div>
				</div>

				<div
					tabIndex={0}
					className='collapse collapse-plus border border-base-300 bg-base-100 rounded-box'
				>
					<div className='collapse-title text-xl font-medium'>
						React vs. Angular vs. Vue?
					</div>
					<div className='collapse-content'>
						<p className='text-justify'>
							If the choice you’re making is based on Angular vs React alone,
							then you’ll simply need to consider the pros and cons discussed
							for those libraries in this post. But overall, keep in mind that
							both libraries can be used for mobile and web apps, while Angular
							is generally better for more complex apps that are
							enterprise-ready. React often requires extra modules and
							components, which keeps the core library small, but means there’s
							extra work involved when incorporating outside tools. Angular, on
							the other hand, is more of a full-fledged solution that doesn’t
							require extras like React often does, though it does have a
							steeper learning curve for its core compared to React.
						</p>
						<br />
						<span className='text-xl underline font-bold'>
							Angular vs Vue :
						</span>
						<p className='text-justify'>
							In most cases, you probably wouldn’t be deciding between only
							Angular and Vue. They are vastly different libraries with very
							different feature sets and learning curves. Vue is the clear
							choice for less experienced developers, and Angular would be
							preferred for those working on larger apps. A large library like
							Angular would require more diligence in keeping up with what’s
							new, while Vue would be less demanding in this regard and the fact
							that the two most recent major releases of Vue are in separate
							repositories helps.
						</p>
					</div>
				</div>
			</div>
		);
};

export default FAQ;