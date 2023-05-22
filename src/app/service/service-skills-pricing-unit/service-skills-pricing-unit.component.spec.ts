import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSkillsPricingUnitComponent } from './service-skills-pricing-unit.component';

describe('ServiceSkillsPricingUnitComponent', () => {
  let component: ServiceSkillsPricingUnitComponent;
  let fixture: ComponentFixture<ServiceSkillsPricingUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceSkillsPricingUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSkillsPricingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
