import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mart } from './mart';

describe('Mart', () => {
  let component: Mart;
  let fixture: ComponentFixture<Mart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
