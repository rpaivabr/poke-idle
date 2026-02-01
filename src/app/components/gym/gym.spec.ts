import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gym } from './gym';

describe('Gym', () => {
  let component: Gym;
  let fixture: ComponentFixture<Gym>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gym]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gym);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
